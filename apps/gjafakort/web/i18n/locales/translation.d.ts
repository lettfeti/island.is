// To parse this data:
//
//   import { Convert, Translation } from "./file";
//
//   const translation = Convert.toTranslation(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface Translation {
  notFound: NotFound
  error: Error
  errorBoundary: ErrorBoundary
  companies: TranslationCompanies
  home: Home
  application: Application
  companySignup: CompanySignup
  company: TranslationCompany
  validation: Validation
  routes: Routes
}

export interface Application {
  title: string
  noConnection: NoConnection
}

export interface NoConnection {
  content: string
  button: string
}

export interface TranslationCompanies {
  name: string
  title: string
  intro: string
  description: string
  notes: Notes
  FAQ: CompaniesFAQ
  cta: CompaniesClass
}

export interface CompaniesFAQ {
  title: string
  items: PurpleItem[]
}

export interface PurpleItem {
  label: string
  contents: Array<string[] | string>
}

export interface CompaniesClass {
  label: string
  content: string
}

export interface Notes {
  label: string
  items: string[]
}

export interface TranslationCompany {
  congratulations: Congratulations
  notQualified: NotQualified
  signup: Signup
}

export interface Congratulations {
  title: string
  intro: string
  description: string
  button: string
  contents: string[]
}

export interface NotQualified {
  title: string
  intro: string
  description: string
  conditions: string[]
  caption: string
  button: string
}

export interface Signup {
  intro: string
  form: SignupForm
}

export interface SignupForm {
  companyName: Company
  companySSN: Company
  companyDisplayName: CompanyDisplayName
  serviceCategory: ServiceCategory
  operation: Operation
  operationsTrouble: OperationsTrouble
  contact: Contact
  submit: string
}

export interface CompanyDisplayName {
  label: string
  tooltip: string
}

export interface Company {
  label: string
}

export interface Contact {
  label: string
  name: string
  email: string
  generalEmail: string
  phoneNumber: string
}

export interface Operation {
  label: string
  instructions: string[]
  options: OperationOption[]
}

export interface OperationOption {
  name: string
  label: string
  tooltip: string
}

export interface OperationsTrouble {
  positiveLabel: string
  negativeLabel: string
  label: string
  tooltip: string
}

export interface ServiceCategory {
  label: string
  placeholder: string
  options: ServiceCategoryOption[]
}

export interface ServiceCategoryOption {
  label: string
  value: string
}

export interface CompanySignup {
  intro: string
  form: CompanySignupForm
  caption: string
}

export interface CompanySignupForm {
  company: FormCompany
  submit: string
}

export interface FormCompany {
  label: string
  placeholder: string
}

export interface Error {
  title: string
  intro: string
  button: string
}

export interface ErrorBoundary {
  title: string
  contents: string[]
}

export interface Home {
  name: string
  title: string
  intro: string
  description: string
  FAQ: HomeFAQ
  cta: HomeCta
}

export interface HomeFAQ {
  title: string
  items: FluffyItem[]
}

export interface FluffyItem {
  label: string
  contents: string[]
}

export interface HomeCta {
  users: CompaniesClass
  companies: CompaniesClass
}

export interface NotFound {
  title: string
  content: string
  button: string
}

export interface Routes {
  companies: RoutesCompanies
  users: Users
}

export interface RoutesCompanies {
  home: string
  application: string
}

export interface Users {
  home: string
}

export interface Validation {}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
  public static toTranslation(json: string): Translation {
    return cast(JSON.parse(json), r('Translation'))
  }

  public static translationToJson(value: Translation): string {
    return JSON.stringify(uncast(value, r('Translation')), null, 2)
  }
}

function invalidValue(typ: any, val: any): never {
  throw Error(
    `Invalid value ${JSON.stringify(val)} for type ${JSON.stringify(typ)}`,
  )
}

function jsonToJSProps(typ: any): any {
  if (typ.jsonToJS === undefined) {
    const map: any = {}
    typ.props.forEach((p: any) => (map[p.json] = { key: p.js, typ: p.typ }))
    typ.jsonToJS = map
  }
  return typ.jsonToJS
}

function jsToJSONProps(typ: any): any {
  if (typ.jsToJSON === undefined) {
    const map: any = {}
    typ.props.forEach((p: any) => (map[p.js] = { key: p.json, typ: p.typ }))
    typ.jsToJSON = map
  }
  return typ.jsToJSON
}

function transform(val: any, typ: any, getProps: any): any {
  function transformPrimitive(typ: string, val: any): any {
    if (typeof typ === typeof val) return val
    return invalidValue(typ, val)
  }

  function transformUnion(typs: any[], val: any): any {
    // val must validate against one typ in typs
    const l = typs.length
    for (let i = 0; i < l; i++) {
      const typ = typs[i]
      try {
        return transform(val, typ, getProps)
      } catch (_) {}
    }
    return invalidValue(typs, val)
  }

  function transformEnum(cases: string[], val: any): any {
    if (cases.indexOf(val) !== -1) return val
    return invalidValue(cases, val)
  }

  function transformArray(typ: any, val: any): any {
    // val must be an array with no invalid elements
    if (!Array.isArray(val)) return invalidValue('array', val)
    return val.map((el) => transform(el, typ, getProps))
  }

  function transformDate(val: any): any {
    if (val === null) {
      return null
    }
    const d = new Date(val)
    if (isNaN(d.valueOf())) {
      return invalidValue('Date', val)
    }
    return d
  }

  function transformObject(
    props: { [k: string]: any },
    additional: any,
    val: any,
  ): any {
    if (val === null || typeof val !== 'object' || Array.isArray(val)) {
      return invalidValue('object', val)
    }
    const result: any = {}
    Object.getOwnPropertyNames(props).forEach((key) => {
      const prop = props[key]
      const v = Object.prototype.hasOwnProperty.call(val, key)
        ? val[key]
        : undefined
      result[prop.key] = transform(v, prop.typ, getProps)
    })
    Object.getOwnPropertyNames(val).forEach((key) => {
      if (!Object.prototype.hasOwnProperty.call(props, key)) {
        result[key] = transform(val[key], additional, getProps)
      }
    })
    return result
  }

  if (typ === 'any') return val
  if (typ === null) {
    if (val === null) return val
    return invalidValue(typ, val)
  }
  if (typ === false) return invalidValue(typ, val)
  while (typeof typ === 'object' && typ.ref !== undefined) {
    typ = typeMap[typ.ref]
  }
  if (Array.isArray(typ)) return transformEnum(typ, val)
  if (typeof typ === 'object') {
    return typ.hasOwnProperty('unionMembers')
      ? transformUnion(typ.unionMembers, val)
      : typ.hasOwnProperty('arrayItems')
      ? transformArray(typ.arrayItems, val)
      : typ.hasOwnProperty('props')
      ? transformObject(getProps(typ), typ.additional, val)
      : invalidValue(typ, val)
  }
  // Numbers can be parsed by Date but shouldn't be.
  if (typ === Date && typeof val !== 'number') return transformDate(val)
  return transformPrimitive(typ, val)
}

function cast<T>(val: any, typ: any): T {
  return transform(val, typ, jsonToJSProps)
}

function uncast<T>(val: T, typ: any): any {
  return transform(val, typ, jsToJSONProps)
}

function a(typ: any) {
  return { arrayItems: typ }
}

function u(...typs: any[]) {
  return { unionMembers: typs }
}

function o(props: any[], additional: any) {
  return { props, additional }
}

function m(additional: any) {
  return { props: [], additional }
}

function r(name: string) {
  return { ref: name }
}

const typeMap: any = {
  Translation: o(
    [
      { json: 'notFound', js: 'notFound', typ: r('NotFound') },
      { json: 'error', js: 'error', typ: r('Error') },
      { json: 'errorBoundary', js: 'errorBoundary', typ: r('ErrorBoundary') },
      { json: 'companies', js: 'companies', typ: r('TranslationCompanies') },
      { json: 'home', js: 'home', typ: r('Home') },
      { json: 'application', js: 'application', typ: r('Application') },
      { json: 'companySignup', js: 'companySignup', typ: r('CompanySignup') },
      { json: 'company', js: 'company', typ: r('TranslationCompany') },
      { json: 'validation', js: 'validation', typ: r('Validation') },
      { json: 'routes', js: 'routes', typ: r('Routes') },
    ],
    false,
  ),
  Application: o(
    [
      { json: 'title', js: 'title', typ: '' },
      { json: 'noConnection', js: 'noConnection', typ: r('NoConnection') },
    ],
    false,
  ),
  NoConnection: o(
    [
      { json: 'content', js: 'content', typ: '' },
      { json: 'button', js: 'button', typ: '' },
    ],
    false,
  ),
  TranslationCompanies: o(
    [
      { json: 'name', js: 'name', typ: '' },
      { json: 'title', js: 'title', typ: '' },
      { json: 'intro', js: 'intro', typ: '' },
      { json: 'description', js: 'description', typ: '' },
      { json: 'notes', js: 'notes', typ: r('Notes') },
      { json: 'FAQ', js: 'FAQ', typ: r('CompaniesFAQ') },
      { json: 'cta', js: 'cta', typ: r('CompaniesClass') },
    ],
    false,
  ),
  CompaniesFAQ: o(
    [
      { json: 'title', js: 'title', typ: '' },
      { json: 'items', js: 'items', typ: a(r('PurpleItem')) },
    ],
    false,
  ),
  PurpleItem: o(
    [
      { json: 'label', js: 'label', typ: '' },
      { json: 'contents', js: 'contents', typ: a(u(a(''), '')) },
    ],
    false,
  ),
  CompaniesClass: o(
    [
      { json: 'label', js: 'label', typ: '' },
      { json: 'content', js: 'content', typ: '' },
    ],
    false,
  ),
  Notes: o(
    [
      { json: 'label', js: 'label', typ: '' },
      { json: 'items', js: 'items', typ: a('') },
    ],
    false,
  ),
  TranslationCompany: o(
    [
      {
        json: 'congratulations',
        js: 'congratulations',
        typ: r('Congratulations'),
      },
      { json: 'notQualified', js: 'notQualified', typ: r('NotQualified') },
      { json: 'signup', js: 'signup', typ: r('Signup') },
    ],
    false,
  ),
  Congratulations: o(
    [
      { json: 'title', js: 'title', typ: '' },
      { json: 'intro', js: 'intro', typ: '' },
      { json: 'description', js: 'description', typ: '' },
      { json: 'button', js: 'button', typ: '' },
      { json: 'contents', js: 'contents', typ: a('') },
    ],
    false,
  ),
  NotQualified: o(
    [
      { json: 'title', js: 'title', typ: '' },
      { json: 'intro', js: 'intro', typ: '' },
      { json: 'description', js: 'description', typ: '' },
      { json: 'conditions', js: 'conditions', typ: a('') },
      { json: 'caption', js: 'caption', typ: '' },
      { json: 'button', js: 'button', typ: '' },
    ],
    false,
  ),
  Signup: o(
    [
      { json: 'intro', js: 'intro', typ: '' },
      { json: 'form', js: 'form', typ: r('SignupForm') },
    ],
    false,
  ),
  SignupForm: o(
    [
      { json: 'companyName', js: 'companyName', typ: r('Company') },
      { json: 'companySSN', js: 'companySSN', typ: r('Company') },
      {
        json: 'companyDisplayName',
        js: 'companyDisplayName',
        typ: r('CompanyDisplayName'),
      },
      {
        json: 'serviceCategory',
        js: 'serviceCategory',
        typ: r('ServiceCategory'),
      },
      { json: 'operation', js: 'operation', typ: r('Operation') },
      {
        json: 'operationsTrouble',
        js: 'operationsTrouble',
        typ: r('OperationsTrouble'),
      },
      { json: 'contact', js: 'contact', typ: r('Contact') },
      { json: 'submit', js: 'submit', typ: '' },
    ],
    false,
  ),
  CompanyDisplayName: o(
    [
      { json: 'label', js: 'label', typ: '' },
      { json: 'tooltip', js: 'tooltip', typ: '' },
    ],
    false,
  ),
  Company: o([{ json: 'label', js: 'label', typ: '' }], false),
  Contact: o(
    [
      { json: 'label', js: 'label', typ: '' },
      { json: 'name', js: 'name', typ: '' },
      { json: 'email', js: 'email', typ: '' },
      { json: 'generalEmail', js: 'generalEmail', typ: '' },
      { json: 'phoneNumber', js: 'phoneNumber', typ: '' },
    ],
    false,
  ),
  Operation: o(
    [
      { json: 'label', js: 'label', typ: '' },
      { json: 'instructions', js: 'instructions', typ: a('') },
      { json: 'options', js: 'options', typ: a(r('OperationOption')) },
    ],
    false,
  ),
  OperationOption: o(
    [
      { json: 'name', js: 'name', typ: '' },
      { json: 'label', js: 'label', typ: '' },
      { json: 'tooltip', js: 'tooltip', typ: '' },
    ],
    false,
  ),
  OperationsTrouble: o(
    [
      { json: 'positiveLabel', js: 'positiveLabel', typ: '' },
      { json: 'negativeLabel', js: 'negativeLabel', typ: '' },
      { json: 'label', js: 'label', typ: '' },
      { json: 'tooltip', js: 'tooltip', typ: '' },
    ],
    false,
  ),
  ServiceCategory: o(
    [
      { json: 'label', js: 'label', typ: '' },
      { json: 'placeholder', js: 'placeholder', typ: '' },
      { json: 'options', js: 'options', typ: a(r('ServiceCategoryOption')) },
    ],
    false,
  ),
  ServiceCategoryOption: o(
    [
      { json: 'label', js: 'label', typ: '' },
      { json: 'value', js: 'value', typ: '' },
    ],
    false,
  ),
  CompanySignup: o(
    [
      { json: 'intro', js: 'intro', typ: '' },
      { json: 'form', js: 'form', typ: r('CompanySignupForm') },
      { json: 'caption', js: 'caption', typ: '' },
    ],
    false,
  ),
  CompanySignupForm: o(
    [
      { json: 'company', js: 'company', typ: r('FormCompany') },
      { json: 'submit', js: 'submit', typ: '' },
    ],
    false,
  ),
  FormCompany: o(
    [
      { json: 'label', js: 'label', typ: '' },
      { json: 'placeholder', js: 'placeholder', typ: '' },
    ],
    false,
  ),
  Error: o(
    [
      { json: 'title', js: 'title', typ: '' },
      { json: 'intro', js: 'intro', typ: '' },
      { json: 'button', js: 'button', typ: '' },
    ],
    false,
  ),
  ErrorBoundary: o(
    [
      { json: 'title', js: 'title', typ: '' },
      { json: 'contents', js: 'contents', typ: a('') },
    ],
    false,
  ),
  Home: o(
    [
      { json: 'name', js: 'name', typ: '' },
      { json: 'title', js: 'title', typ: '' },
      { json: 'intro', js: 'intro', typ: '' },
      { json: 'description', js: 'description', typ: '' },
      { json: 'FAQ', js: 'FAQ', typ: r('HomeFAQ') },
      { json: 'cta', js: 'cta', typ: r('HomeCta') },
    ],
    false,
  ),
  HomeFAQ: o(
    [
      { json: 'title', js: 'title', typ: '' },
      { json: 'items', js: 'items', typ: a(r('FluffyItem')) },
    ],
    false,
  ),
  FluffyItem: o(
    [
      { json: 'label', js: 'label', typ: '' },
      { json: 'contents', js: 'contents', typ: a('') },
    ],
    false,
  ),
  HomeCta: o(
    [
      { json: 'users', js: 'users', typ: r('CompaniesClass') },
      { json: 'companies', js: 'companies', typ: r('CompaniesClass') },
    ],
    false,
  ),
  NotFound: o(
    [
      { json: 'title', js: 'title', typ: '' },
      { json: 'content', js: 'content', typ: '' },
      { json: 'button', js: 'button', typ: '' },
    ],
    false,
  ),
  Routes: o(
    [
      { json: 'companies', js: 'companies', typ: r('RoutesCompanies') },
      { json: 'users', js: 'users', typ: r('Users') },
    ],
    false,
  ),
  RoutesCompanies: o(
    [
      { json: 'home', js: 'home', typ: '' },
      { json: 'application', js: 'application', typ: '' },
    ],
    false,
  ),
  Users: o([{ json: 'home', js: 'home', typ: '' }], false),
  Validation: o([], false),
}

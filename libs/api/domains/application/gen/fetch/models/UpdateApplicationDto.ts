/* tslint:disable */
/* eslint-disable */
/**
 * Application backend
 * This is provided as a reference to implement other backends.
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface UpdateApplicationDto
 */
export interface UpdateApplicationDto {
    /**
     * 
     * @type {string}
     * @memberof UpdateApplicationDto
     */
    id: string;
    /**
     * 
     * @type {string}
     * @memberof UpdateApplicationDto
     */
    typeId?: UpdateApplicationDtoTypeIdEnum;
    /**
     * 
     * @type {string}
     * @memberof UpdateApplicationDto
     */
    applicant?: string;
    /**
     * 
     * @type {string}
     * @memberof UpdateApplicationDto
     */
    assignee?: string;
    /**
     * 
     * @type {string}
     * @memberof UpdateApplicationDto
     */
    externalId?: string;
    /**
     * 
     * @type {string}
     * @memberof UpdateApplicationDto
     */
    state?: UpdateApplicationDtoStateEnum;
    /**
     * 
     * @type {object}
     * @memberof UpdateApplicationDto
     */
    answers?: object;
    /**
     * 
     * @type {Array<string>}
     * @memberof UpdateApplicationDto
     */
    attachments?: Array<string>;
}

export function UpdateApplicationDtoFromJSON(json: any): UpdateApplicationDto {
    return UpdateApplicationDtoFromJSONTyped(json, false);
}

export function UpdateApplicationDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): UpdateApplicationDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': json['id'],
        'typeId': !exists(json, 'typeId') ? undefined : json['typeId'],
        'applicant': !exists(json, 'applicant') ? undefined : json['applicant'],
        'assignee': !exists(json, 'assignee') ? undefined : json['assignee'],
        'externalId': !exists(json, 'externalId') ? undefined : json['externalId'],
        'state': !exists(json, 'state') ? undefined : json['state'],
        'answers': !exists(json, 'answers') ? undefined : json['answers'],
        'attachments': !exists(json, 'attachments') ? undefined : json['attachments'],
    };
}

export function UpdateApplicationDtoToJSON(value?: UpdateApplicationDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'typeId': value.typeId,
        'applicant': value.applicant,
        'assignee': value.assignee,
        'externalId': value.externalId,
        'state': value.state,
        'answers': value.answers,
        'attachments': value.attachments,
    };
}

/**
* @export
* @enum {string}
*/
export enum UpdateApplicationDtoTypeIdEnum {
    ExampleForm = 'ExampleForm',
    ExampleForm2 = 'ExampleForm2',
    ExampleForm3 = 'ExampleForm3',
    FamilyAndPets = 'FamilyAndPets'
}
/**
* @export
* @enum {string}
*/
export enum UpdateApplicationDtoStateEnum {
    DRAFT = 'DRAFT',
    BEINGPROCESSED = 'BEING_PROCESSED',
    NEEDSINFORMATION = 'NEEDS_INFORMATION',
    PENDING = 'PENDING',
    APPROVED = 'APPROVED',
    MANUALAPPROVED = 'MANUAL_APPROVED',
    REJECTED = 'REJECTED',
    UNKNOWN = 'UNKNOWN'
}



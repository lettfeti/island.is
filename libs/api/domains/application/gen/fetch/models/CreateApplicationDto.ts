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
 * @interface CreateApplicationDto
 */
export interface CreateApplicationDto {
    /**
     * 
     * @type {string}
     * @memberof CreateApplicationDto
     */
    typeId: CreateApplicationDtoTypeIdEnum;
    /**
     * 
     * @type {string}
     * @memberof CreateApplicationDto
     */
    applicant: string;
    /**
     * 
     * @type {string}
     * @memberof CreateApplicationDto
     */
    assignee: string;
    /**
     * 
     * @type {string}
     * @memberof CreateApplicationDto
     */
    externalId?: string;
    /**
     * 
     * @type {string}
     * @memberof CreateApplicationDto
     */
    state: CreateApplicationDtoStateEnum;
    /**
     * 
     * @type {object}
     * @memberof CreateApplicationDto
     */
    answers: object;
    /**
     * 
     * @type {Array<string>}
     * @memberof CreateApplicationDto
     */
    attachments?: Array<string>;
}

export function CreateApplicationDtoFromJSON(json: any): CreateApplicationDto {
    return CreateApplicationDtoFromJSONTyped(json, false);
}

export function CreateApplicationDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): CreateApplicationDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'typeId': json['typeId'],
        'applicant': json['applicant'],
        'assignee': json['assignee'],
        'externalId': !exists(json, 'externalId') ? undefined : json['externalId'],
        'state': json['state'],
        'answers': json['answers'],
        'attachments': !exists(json, 'attachments') ? undefined : json['attachments'],
    };
}

export function CreateApplicationDtoToJSON(value?: CreateApplicationDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
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
export enum CreateApplicationDtoTypeIdEnum {
    ExampleForm = 'ExampleForm',
    ExampleForm2 = 'ExampleForm2',
    ExampleForm3 = 'ExampleForm3',
    FamilyAndPets = 'FamilyAndPets',
    PaternityLeave = 'PaternityLeave'
}
/**
* @export
* @enum {string}
*/
export enum CreateApplicationDtoStateEnum {
    DRAFT = 'DRAFT',
    BEINGPROCESSED = 'BEING_PROCESSED',
    NEEDSINFORMATION = 'NEEDS_INFORMATION',
    PENDING = 'PENDING',
    APPROVED = 'APPROVED',
    MANUALAPPROVED = 'MANUAL_APPROVED',
    REJECTED = 'REJECTED',
    UNKNOWN = 'UNKNOWN'
}


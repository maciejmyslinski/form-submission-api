// @flow
import * as R from 'ramda';

type QuestionType =
  | 'CHECKBOX'
  | 'CHECKBOX_GRID'
  | 'DATE'
  | 'DATETIME'
  | 'DURATION'
  | 'GRID'
  | 'LIST'
  | 'MULTIPLE_CHOICE'
  | 'PARAGRAPH_TEXT'
  | 'SCALE'
  | 'TEXT'
  | 'TIME';

// https://developers.google.com/apps-script/reference/forms/item-response#getresponse
type ResponseType =
  | String
  | Array<String>
  | Array<Array<String>>
  | { hours: Number, minutes: Number, seconds: Number };

export function submitAForm(params: {
  formId: string,
  responses: Array<{
    id: number,
    type: QuestionType,
    value: ResponseType,
  }>,
}): number {
  const { formId, responses } = params;
  const form = FormApp.openById(formId);
  const formResponse = form.createResponse();

  responses.forEach((response) => {
    const { value } = response;
    const item = form.getItemById(response.id);
    if (R.isNil(item)) return;
    const itemTypeString = String(item.getType());
    switch (itemTypeString) {
      case 'CHECKBOX': {
        const isResponseShapeValid = R.type(value) === 'Array' && R.type(value[0]) === 'String';
        if (isResponseShapeValid) {
          formResponse.withItemResponse(item.asCheckboxItem().createResponse(value));
        }
        break;
      }
      case 'CHECKBOX_GRID': {
        const isResponseShapeValid =
          R.type(value) === 'Array' &&
          R.type(value[0]) === 'Array' &&
          R.type(value[0][0]) === String;
        if (isResponseShapeValid) {
          formResponse.withItemResponse(item.asCheckboxGridItem().createResponse(value));
        }
        break;
      }
      case 'DATE': {
        const isResponseShapeValid = R.type(value) === 'String';
        if (isResponseShapeValid) {
          formResponse.withItemResponse(item.asDateItem().createResponse(new Date(value)));
        }
        break;
      }
      case 'DATETIME': {
        const isResponseShapeValid = R.type(value) === 'String';
        if (isResponseShapeValid) {
          formResponse.withItemResponse(item.asDateTimeItem().createResponse(new Date(value)));
        }
        break;
      }
      case 'DURATION': {
        const isResponseShapeValid =
          R.type(value) === 'Object' &&
          value.hour >= 0 &&
          value.hour <= 72 &&
          value.minutes >= 0 &&
          value.minutes <= 59 &&
          value.seconds >= 0 &&
          value.seconds <= 59;
        if (isResponseShapeValid) {
          formResponse.withItemResponse(item.asDurationItem()
            .createResponse(value.hours, value.minutes, value.seconds));
        }
        break;
      }
      case 'GRID': {
        const isResponseShapeValid = R.type(value) === 'Array' && R.type(value[0]) === 'String';
        if (isResponseShapeValid) {
          formResponse.withItemResponse(item.asGridItem().createResponse(value));
        }
        break;
      }
      case 'LIST': {
        const isResponseShapeValid = R.type(value) === 'String';
        if (isResponseShapeValid) {
          formResponse.withItemResponse(item.asListItem().createResponse(value));
        }
        break;
      }
      case 'MULTIPLE_CHOICE': {
        const isResponseShapeValid = R.type(value) === 'String';
        if (isResponseShapeValid) {
          formResponse.withItemResponse(item.asMultipleChoiceItem().createResponse(value));
        }
        break;
      }
      case 'PARAGRAPH_TEXT': {
        const isResponseShapeValid = R.type(value) === 'String';
        if (isResponseShapeValid) {
          formResponse.withItemResponse(item.asParagraphTextItem().createResponse(value));
        }
        break;
      }
      case 'SCALE': {
        const isResponseShapeValid = R.type(value) === 'Number';
        if (isResponseShapeValid) {
          formResponse.withItemResponse(item.asScaleItem().createResponse(value));
        }
        break;
      }
      case 'TEXT': {
        const isResponseShapeValid = R.type(value) === 'String';
        if (isResponseShapeValid) {
          formResponse.withItemResponse(item.asTextItem().createResponse(value));
        }
        break;
      }
      case 'TIME': {
        const isResponseShapeValid =
          R.type(value) === 'Object' &&
          value.hour >= 0 &&
          value.hour <= 23 &&
          value.minute >= 0 &&
          value.minute <= 59;
        if (isResponseShapeValid) {
          formResponse.withItemResponse(item.asTimeItem().createResponse(value.hour, value.minute));
        }
        break;
      }
      default:
    }
  });
  formResponse.submit();
  return 200;
}

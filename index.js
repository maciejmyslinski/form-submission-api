// @flow
import { isNil, type } from 'ramda';

type QuestionType =
  | 'CHECKBOX'
  | 'CHECKBOX_GRID'
  | 'DATE'
  | 'DATETIME'
  | 'DURATION'
  | 'GRID'
  | 'IMAGE'
  | 'LIST'
  | 'MULTIPLE_CHOICE'
  | 'PAGE_BREAK'
  | 'PARAGRAPH_TEXT'
  | 'SCALE'
  | 'SECTION_HEADER'
  | 'TEXT'
  | 'TIME';

// https://developers.google.com/apps-script/reference/forms/item-response#getresponse
type ResponseType = String | Array<String> | Array<Array<String>>;

function submitAForm(params: {
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
    const item = form.getItemById(response.id);
    if (isNil(item)) return;
    const itemTypeString = item.getType.toString();
    let typedItem;
    switch (itemTypeString) {
      case 'CHECKBOX': {
        typedItem = item.asCheckboxItem();
        if (type(response.value) === 'Array' && type(response.value[0]) === 'String') {
          const itemResponse = typedItem.createResponse(response.value);
          formResponse.withItemResponse(itemResponse);
        }
        break;
      }
      default:
    }
  });
  formResponse.submit();
  return params || 200;
}

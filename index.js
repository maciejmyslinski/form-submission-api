// @flow

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
    response: ResponseType,
  }>,
}): number {
  const { formId, responses } = params;
  const form = FormApp.openById(formId);
  const items = form.getItems();
  const formResponse = form.createResponse();
  // for every response call formResponse.withItemResponse(response);
  formResponse.submit();
  return params || 200;
}

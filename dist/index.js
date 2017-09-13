'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getYearMonthBucket = exports.AccountSettingPostBodySchema = exports.TwitterFeedbackSchema = exports.EmailFeedbackSchema = exports.EmailFeedbackPostBodySchema = exports.WatsonClassifyResponseSchema = exports.FeedbackAnalysisSchema = exports.SentimentAnalysisResponseSchema = exports.SentenceSchema = exports.ClassSchema = exports.SentimentSchema = exports.TextSpanSchema = exports.SupportedLanguageSchema = undefined;

var _joiBrowser = require('joi-browser');

var _joiBrowser2 = _interopRequireDefault(_joiBrowser);

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SupportedLanguageSchema = exports.SupportedLanguageSchema = _joiBrowser2.default.string().valid(['zh', 'zh-Hant', 'en', 'fr', 'de', 'it', 'ja', 'ko', 'pt', 'es']);

var TextSpanSchema = exports.TextSpanSchema = _joiBrowser2.default.object({
  beginOffset: _joiBrowser2.default.number().min(-1).required(),
  content: _joiBrowser2.default.string().required()
}).unknown();

var SentimentSchema = exports.SentimentSchema = _joiBrowser2.default.object({
  magnitude: _joiBrowser2.default.number().min(0).required(),
  score: _joiBrowser2.default.number().min(-1).max(1).required()
}).unknown();

var ClassSchema = exports.ClassSchema = _joiBrowser2.default.object({
  className: _joiBrowser2.default.string().required(),
  confidence: _joiBrowser2.default.number().min(0).max(1).required()
}).unknown();

var SentenceSchema = exports.SentenceSchema = _joiBrowser2.default.object({
  sentiment: SentimentSchema.required(),
  text: TextSpanSchema.required()
}).unknown();

var SentimentAnalysisResponseSchema = exports.SentimentAnalysisResponseSchema = _joiBrowser2.default.object({
  documentSentiment: SentimentSchema.required(),
  language: SupportedLanguageSchema.required(),
  sentences: _joiBrowser2.default.array().items(SentenceSchema).required()
}).unknown();

var FeedbackAnalysisSchema = exports.FeedbackAnalysisSchema = _joiBrowser2.default.object({
  accountId: _joiBrowser2.default.string().required(),
  contentSentiment: SentimentSchema.required(),
  documentClassification: _joiBrowser2.default.array().items(ClassSchema).required(),
  feedbackId: _joiBrowser2.default.string().guid().default(function () {
    return _uuid2.default.v4();
  }, 'uuid v4'),
  feedbackType: _joiBrowser2.default.string().allow(['email', 'twitter']).required(),
  id: _joiBrowser2.default.string().guid().default(function () {
    return _uuid2.default.v4();
  }, 'uuid v4'),
  sentences: _joiBrowser2.default.array().items(SentenceSchema.keys({
    classification: _joiBrowser2.default.array().items(ClassSchema).required()
  }).required()).required(),
  topDocumentClasses: _joiBrowser2.default.array().items(_joiBrowser2.default.string()).required(),
  topSentenceClasses: _joiBrowser2.default.array().items(_joiBrowser2.default.string()).required()
}).unknown().required();

var WatsonClassifyResponseSchema = exports.WatsonClassifyResponseSchema = _joiBrowser2.default.object({
  classes: _joiBrowser2.default.array().items(_joiBrowser2.default.object({
    class_name: _joiBrowser2.default.string().required(),
    confidence: _joiBrowser2.default.number().min(0).max(1).required()
  }).unknown()).required(),
  classifier_id: _joiBrowser2.default.string().required(),
  text: _joiBrowser2.default.string().required(),
  top_class: _joiBrowser2.default.string().required(),
  url: _joiBrowser2.default.string().uri({ allowRelative: true }).required()
});

var EmailFeedbackPostBodySchema = exports.EmailFeedbackPostBodySchema = _joiBrowser2.default.object({
  content: _joiBrowser2.default.string().required(),
  emailSentDate: _joiBrowser2.default.string().isoDate().required(),
  from: _joiBrowser2.default.string().email().required(),
  subject: _joiBrowser2.default.string().required(),
  to: _joiBrowser2.default.string().email().required()
}).unknown().required();

var EmailFeedbackSchema = exports.EmailFeedbackSchema = EmailFeedbackPostBodySchema.keys({
  accountId: _joiBrowser2.default.string().required(),
  id: _joiBrowser2.default.string().guid().default(function () {
    return _uuid2.default.v4();
  }, 'uuid v4')
});

var TwitterFeedbackSchema = exports.TwitterFeedbackSchema = _joiBrowser2.default.object({
  accountId: _joiBrowser2.default.string().required(),
  id: _joiBrowser2.default.string().guid().default(function () {
    return _uuid2.default.v4();
  }, 'uuid v4'),
  statusId: _joiBrowser2.default.string().required()
}).unknown().required();

// currently only 1 tier
var AccountSettingPostBodySchema = exports.AccountSettingPostBodySchema = _joiBrowser2.default.object({
  twitterSearches: _joiBrowser2.default.array().items(_joiBrowser2.default.string().required()).required()
}).unknown().required();

// prettier will remove the surrounding /*:: */ which is needed since other
// plugins don't fully support flow opague types yet
/* eslint-disable prettier/prettier */
/*::
export opaque type YearMonthBucketType: string = string;
*/
/* eslint-enable */

var YearMonthBucketSchema = _joiBrowser2.default.string().regex(/^\d{4}-\d{2}$/);

var validateEmailPostBody = function validateEmailPostBody(maybeYMB) {
  return Promise.resolve().then(function () {
    var _Joi$validate = _joiBrowser2.default.validate(maybeYMB, YearMonthBucketSchema),
        error = _Joi$validate.error,
        value = _Joi$validate.value;

    if (error) {
      return Promise.reject(error.annotate(true));
    }

    return value;
  });
};

var getYearMonthBucket = exports.getYearMonthBucket = function getYearMonthBucket(maybeYMB) {
  return validateEmailPostBody(maybeYMB);
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJTdXBwb3J0ZWRMYW5ndWFnZVNjaGVtYSIsInN0cmluZyIsInZhbGlkIiwiVGV4dFNwYW5TY2hlbWEiLCJvYmplY3QiLCJiZWdpbk9mZnNldCIsIm51bWJlciIsIm1pbiIsInJlcXVpcmVkIiwiY29udGVudCIsInVua25vd24iLCJTZW50aW1lbnRTY2hlbWEiLCJtYWduaXR1ZGUiLCJzY29yZSIsIm1heCIsIkNsYXNzU2NoZW1hIiwiY2xhc3NOYW1lIiwiY29uZmlkZW5jZSIsIlNlbnRlbmNlU2NoZW1hIiwic2VudGltZW50IiwidGV4dCIsIlNlbnRpbWVudEFuYWx5c2lzUmVzcG9uc2VTY2hlbWEiLCJkb2N1bWVudFNlbnRpbWVudCIsImxhbmd1YWdlIiwic2VudGVuY2VzIiwiYXJyYXkiLCJpdGVtcyIsIkZlZWRiYWNrQW5hbHlzaXNTY2hlbWEiLCJhY2NvdW50SWQiLCJjb250ZW50U2VudGltZW50IiwiZG9jdW1lbnRDbGFzc2lmaWNhdGlvbiIsImZlZWRiYWNrSWQiLCJndWlkIiwiZGVmYXVsdCIsInY0IiwiZmVlZGJhY2tUeXBlIiwiYWxsb3ciLCJpZCIsImtleXMiLCJjbGFzc2lmaWNhdGlvbiIsInRvcERvY3VtZW50Q2xhc3NlcyIsInRvcFNlbnRlbmNlQ2xhc3NlcyIsIldhdHNvbkNsYXNzaWZ5UmVzcG9uc2VTY2hlbWEiLCJjbGFzc2VzIiwiY2xhc3NfbmFtZSIsImNsYXNzaWZpZXJfaWQiLCJ0b3BfY2xhc3MiLCJ1cmwiLCJ1cmkiLCJhbGxvd1JlbGF0aXZlIiwiRW1haWxGZWVkYmFja1Bvc3RCb2R5U2NoZW1hIiwiZW1haWxTZW50RGF0ZSIsImlzb0RhdGUiLCJmcm9tIiwiZW1haWwiLCJzdWJqZWN0IiwidG8iLCJFbWFpbEZlZWRiYWNrU2NoZW1hIiwiVHdpdHRlckZlZWRiYWNrU2NoZW1hIiwic3RhdHVzSWQiLCJBY2NvdW50U2V0dGluZ1Bvc3RCb2R5U2NoZW1hIiwidHdpdHRlclNlYXJjaGVzIiwiWWVhck1vbnRoQnVja2V0U2NoZW1hIiwicmVnZXgiLCJ2YWxpZGF0ZUVtYWlsUG9zdEJvZHkiLCJtYXliZVlNQiIsIlByb21pc2UiLCJyZXNvbHZlIiwidGhlbiIsInZhbGlkYXRlIiwiZXJyb3IiLCJ2YWx1ZSIsInJlamVjdCIsImFubm90YXRlIiwiZ2V0WWVhck1vbnRoQnVja2V0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBRUE7Ozs7QUFDQTs7Ozs7O0FBb0JPLElBQU1BLDREQUEwQixxQkFBSUMsTUFBSixHQUFhQyxLQUFiLENBQW1CLENBQ3hELElBRHdELEVBRXhELFNBRndELEVBR3hELElBSHdELEVBSXhELElBSndELEVBS3hELElBTHdELEVBTXhELElBTndELEVBT3hELElBUHdELEVBUXhELElBUndELEVBU3hELElBVHdELEVBVXhELElBVndELENBQW5CLENBQWhDOztBQWtCQSxJQUFNQywwQ0FBaUIscUJBQUlDLE1BQUosQ0FBVztBQUN2Q0MsZUFBYSxxQkFBSUMsTUFBSixHQUNWQyxHQURVLENBQ04sQ0FBQyxDQURLLEVBRVZDLFFBRlUsRUFEMEI7QUFJdkNDLFdBQVMscUJBQUlSLE1BQUosR0FBYU8sUUFBYjtBQUo4QixDQUFYLEVBSzNCRSxPQUwyQixFQUF2Qjs7QUFZQSxJQUFNQyw0Q0FBa0IscUJBQUlQLE1BQUosQ0FBVztBQUN4Q1EsYUFBVyxxQkFBSU4sTUFBSixHQUNSQyxHQURRLENBQ0osQ0FESSxFQUVSQyxRQUZRLEVBRDZCO0FBSXhDSyxTQUFPLHFCQUFJUCxNQUFKLEdBQ0pDLEdBREksQ0FDQSxDQUFDLENBREQsRUFFSk8sR0FGSSxDQUVBLENBRkEsRUFHSk4sUUFISTtBQUppQyxDQUFYLEVBUTVCRSxPQVI0QixFQUF4Qjs7QUFlQSxJQUFNSyxvQ0FBYyxxQkFBSVgsTUFBSixDQUFXO0FBQ3BDWSxhQUFXLHFCQUFJZixNQUFKLEdBQWFPLFFBQWIsRUFEeUI7QUFFcENTLGNBQVkscUJBQUlYLE1BQUosR0FDVEMsR0FEUyxDQUNMLENBREssRUFFVE8sR0FGUyxDQUVMLENBRkssRUFHVE4sUUFIUztBQUZ3QixDQUFYLEVBTXhCRSxPQU53QixFQUFwQjs7QUFhQSxJQUFNUSwwQ0FBaUIscUJBQUlkLE1BQUosQ0FBVztBQUN2Q2UsYUFBV1IsZ0JBQWdCSCxRQUFoQixFQUQ0QjtBQUV2Q1ksUUFBTWpCLGVBQWVLLFFBQWY7QUFGaUMsQ0FBWCxFQUczQkUsT0FIMkIsRUFBdkI7O0FBV0EsSUFBTVcsNEVBQWtDLHFCQUFJakIsTUFBSixDQUFXO0FBQ3hEa0IscUJBQW1CWCxnQkFBZ0JILFFBQWhCLEVBRHFDO0FBRXhEZSxZQUFVdkIsd0JBQXdCUSxRQUF4QixFQUY4QztBQUd4RGdCLGFBQVcscUJBQUlDLEtBQUosR0FDUkMsS0FEUSxDQUNGUixjQURFLEVBRVJWLFFBRlE7QUFINkMsQ0FBWCxFQU01Q0UsT0FONEMsRUFBeEM7O0FBaUNBLElBQU1pQiwwREFBeUIscUJBQUl2QixNQUFKLENBQVc7QUFDL0N3QixhQUFXLHFCQUFJM0IsTUFBSixHQUFhTyxRQUFiLEVBRG9DO0FBRS9DcUIsb0JBQWtCbEIsZ0JBQWdCSCxRQUFoQixFQUY2QjtBQUcvQ3NCLDBCQUF3QixxQkFBSUwsS0FBSixHQUNyQkMsS0FEcUIsQ0FDZlgsV0FEZSxFQUVyQlAsUUFGcUIsRUFIdUI7QUFNL0N1QixjQUFZLHFCQUFJOUIsTUFBSixHQUNUK0IsSUFEUyxHQUVUQyxPQUZTLENBRUQ7QUFBQSxXQUFNLGVBQUtDLEVBQUwsRUFBTjtBQUFBLEdBRkMsRUFFZ0IsU0FGaEIsQ0FObUM7QUFTL0NDLGdCQUFjLHFCQUFJbEMsTUFBSixHQUNYbUMsS0FEVyxDQUNMLENBQUMsT0FBRCxFQUFVLFNBQVYsQ0FESyxFQUVYNUIsUUFGVyxFQVRpQztBQVkvQzZCLE1BQUkscUJBQUlwQyxNQUFKLEdBQ0QrQixJQURDLEdBRURDLE9BRkMsQ0FFTztBQUFBLFdBQU0sZUFBS0MsRUFBTCxFQUFOO0FBQUEsR0FGUCxFQUV3QixTQUZ4QixDQVoyQztBQWUvQ1YsYUFBVyxxQkFBSUMsS0FBSixHQUNSQyxLQURRLENBRVBSLGVBQWVvQixJQUFmLENBQW9CO0FBQ2xCQyxvQkFBZ0IscUJBQUlkLEtBQUosR0FDYkMsS0FEYSxDQUNQWCxXQURPLEVBRWJQLFFBRmE7QUFERSxHQUFwQixFQUlHQSxRQUpILEVBRk8sRUFRUkEsUUFSUSxFQWZvQztBQXdCL0NnQyxzQkFBb0IscUJBQUlmLEtBQUosR0FDakJDLEtBRGlCLENBQ1gscUJBQUl6QixNQUFKLEVBRFcsRUFFakJPLFFBRmlCLEVBeEIyQjtBQTJCL0NpQyxzQkFBb0IscUJBQUloQixLQUFKLEdBQ2pCQyxLQURpQixDQUNYLHFCQUFJekIsTUFBSixFQURXLEVBRWpCTyxRQUZpQjtBQTNCMkIsQ0FBWCxFQStCbkNFLE9BL0JtQyxHQWdDbkNGLFFBaENtQyxFQUEvQjs7QUEwQ0EsSUFBTWtDLHNFQUErQixxQkFBSXRDLE1BQUosQ0FBVztBQUNyRHVDLFdBQVMscUJBQUlsQixLQUFKLEdBQ05DLEtBRE0sQ0FFTCxxQkFBSXRCLE1BQUosQ0FBVztBQUNUd0MsZ0JBQVkscUJBQUkzQyxNQUFKLEdBQWFPLFFBQWIsRUFESDtBQUVUUyxnQkFBWSxxQkFBSVgsTUFBSixHQUNUQyxHQURTLENBQ0wsQ0FESyxFQUVUTyxHQUZTLENBRUwsQ0FGSyxFQUdUTixRQUhTO0FBRkgsR0FBWCxFQU1HRSxPQU5ILEVBRkssRUFVTkYsUUFWTSxFQUQ0QztBQVlyRHFDLGlCQUFlLHFCQUFJNUMsTUFBSixHQUFhTyxRQUFiLEVBWnNDO0FBYXJEWSxRQUFNLHFCQUFJbkIsTUFBSixHQUFhTyxRQUFiLEVBYitDO0FBY3JEc0MsYUFBVyxxQkFBSTdDLE1BQUosR0FBYU8sUUFBYixFQWQwQztBQWVyRHVDLE9BQUsscUJBQUk5QyxNQUFKLEdBQ0YrQyxHQURFLENBQ0UsRUFBRUMsZUFBZSxJQUFqQixFQURGLEVBRUZ6QyxRQUZFO0FBZmdELENBQVgsQ0FBckM7O0FBNEJBLElBQU0wQyxvRUFBOEIscUJBQUk5QyxNQUFKLENBQVc7QUFDcERLLFdBQVMscUJBQUlSLE1BQUosR0FBYU8sUUFBYixFQUQyQztBQUVwRDJDLGlCQUFlLHFCQUFJbEQsTUFBSixHQUNabUQsT0FEWSxHQUVaNUMsUUFGWSxFQUZxQztBQUtwRDZDLFFBQU0scUJBQUlwRCxNQUFKLEdBQ0hxRCxLQURHLEdBRUg5QyxRQUZHLEVBTDhDO0FBUXBEK0MsV0FBUyxxQkFBSXRELE1BQUosR0FBYU8sUUFBYixFQVIyQztBQVNwRGdELE1BQUkscUJBQUl2RCxNQUFKLEdBQ0RxRCxLQURDLEdBRUQ5QyxRQUZDO0FBVGdELENBQVgsRUFheENFLE9BYndDLEdBY3hDRixRQWR3QyxFQUFwQzs7QUEwQkEsSUFBTWlELG9EQUFzQlAsNEJBQTRCWixJQUE1QixDQUFpQztBQUNsRVYsYUFBVyxxQkFBSTNCLE1BQUosR0FBYU8sUUFBYixFQUR1RDtBQUVsRTZCLE1BQUkscUJBQUlwQyxNQUFKLEdBQ0QrQixJQURDLEdBRURDLE9BRkMsQ0FFTztBQUFBLFdBQU0sZUFBS0MsRUFBTCxFQUFOO0FBQUEsR0FGUCxFQUV3QixTQUZ4QjtBQUY4RCxDQUFqQyxDQUE1Qjs7QUFzQkEsSUFBTXdCLHdEQUF3QixxQkFBSXRELE1BQUosQ0FBVztBQUM5Q3dCLGFBQVcscUJBQUkzQixNQUFKLEdBQWFPLFFBQWIsRUFEbUM7QUFFOUM2QixNQUFJLHFCQUFJcEMsTUFBSixHQUNEK0IsSUFEQyxHQUVEQyxPQUZDLENBRU87QUFBQSxXQUFNLGVBQUtDLEVBQUwsRUFBTjtBQUFBLEdBRlAsRUFFd0IsU0FGeEIsQ0FGMEM7QUFLOUN5QixZQUFVLHFCQUFJMUQsTUFBSixHQUFhTyxRQUFiO0FBTG9DLENBQVgsRUFPbENFLE9BUGtDLEdBUWxDRixRQVJrQyxFQUE5Qjs7QUFlUDtBQXFCTyxJQUFNb0Qsc0VBQStCLHFCQUFJeEQsTUFBSixDQUFXO0FBQ3JEeUQsbUJBQWlCLHFCQUFJcEMsS0FBSixHQUNkQyxLQURjLENBQ1IscUJBQUl6QixNQUFKLEdBQWFPLFFBQWIsRUFEUSxFQUVkQSxRQUZjO0FBRG9DLENBQVgsRUFLekNFLE9BTHlDLEdBTXpDRixRQU55QyxFQUFyQzs7QUFRUDtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7O0FBRUEsSUFBTXNELHdCQUF3QixxQkFBSTdELE1BQUosR0FBYThELEtBQWIsQ0FBbUIsZUFBbkIsQ0FBOUI7O0FBRUEsSUFBTUMsd0JBQXdCLFNBQXhCQSxxQkFBd0IsQ0FDNUJDLFFBRDRCO0FBQUEsU0FHNUJDLFFBQVFDLE9BQVIsR0FBa0JDLElBQWxCLENBQXVCLFlBQTZDO0FBQUEsd0JBQ3pDLHFCQUFJQyxRQUFKLENBQWFKLFFBQWIsRUFBdUJILHFCQUF2QixDQUR5QztBQUFBLFFBQzFEUSxLQUQwRCxpQkFDMURBLEtBRDBEO0FBQUEsUUFDbkRDLEtBRG1ELGlCQUNuREEsS0FEbUQ7O0FBR2xFLFFBQUlELEtBQUosRUFBVztBQUNULGFBQU9KLFFBQVFNLE1BQVIsQ0FBZUYsTUFBTUcsUUFBTixDQUFlLElBQWYsQ0FBZixDQUFQO0FBQ0Q7O0FBRUQsV0FBT0YsS0FBUDtBQUNELEdBUkQsQ0FINEI7QUFBQSxDQUE5Qjs7QUFhTyxJQUFNRyxrREFBcUIsU0FBckJBLGtCQUFxQixDQUFDVCxRQUFEO0FBQUEsU0FDaENELHNCQUFzQkMsUUFBdEIsQ0FEZ0M7QUFBQSxDQUEzQiIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIEBmbG93XG5cbmltcG9ydCBKb2kgZnJvbSAnam9pLWJyb3dzZXInO1xuaW1wb3J0IHV1aWQgZnJvbSAndXVpZCc7XG5cbmV4cG9ydCB0eXBlIE1vZGVsU2F2ZWRGaWVsZHNUeXBlID0ge3xcbiAgY3JlYXRlZEF0OiBzdHJpbmcsXG4gIGlkOiBzdHJpbmcsXG4gIHVwZGF0ZWRBdD86IHN0cmluZyxcbnx9O1xuXG5leHBvcnQgdHlwZSBTdXBwb3J0ZWRMYW5ndWFnZVR5cGUgPVxuICB8ICd6aCdcbiAgfCAnemgtSGFudCdcbiAgfCAnZW4nXG4gIHwgJ2ZyJ1xuICB8ICdkZSdcbiAgfCAnaXQnXG4gIHwgJ2phJ1xuICB8ICdrbydcbiAgfCAncHQnXG4gIHwgJ2VzJztcblxuZXhwb3J0IGNvbnN0IFN1cHBvcnRlZExhbmd1YWdlU2NoZW1hID0gSm9pLnN0cmluZygpLnZhbGlkKFtcbiAgJ3poJyxcbiAgJ3poLUhhbnQnLFxuICAnZW4nLFxuICAnZnInLFxuICAnZGUnLFxuICAnaXQnLFxuICAnamEnLFxuICAna28nLFxuICAncHQnLFxuICAnZXMnLFxuXSk7XG5cbnR5cGUgVGV4dFNwYW5UeXBlID0ge1xuICBiZWdpbk9mZnNldDogbnVtYmVyLFxuICBjb250ZW50OiBzdHJpbmcsXG59O1xuXG5leHBvcnQgY29uc3QgVGV4dFNwYW5TY2hlbWEgPSBKb2kub2JqZWN0KHtcbiAgYmVnaW5PZmZzZXQ6IEpvaS5udW1iZXIoKVxuICAgIC5taW4oLTEpXG4gICAgLnJlcXVpcmVkKCksXG4gIGNvbnRlbnQ6IEpvaS5zdHJpbmcoKS5yZXF1aXJlZCgpLFxufSkudW5rbm93bigpO1xuXG5leHBvcnQgdHlwZSBTZW50aW1lbnRUeXBlID0ge1xuICBtYWduaXR1ZGU6IG51bWJlcixcbiAgc2NvcmU6IG51bWJlcixcbn07XG5cbmV4cG9ydCBjb25zdCBTZW50aW1lbnRTY2hlbWEgPSBKb2kub2JqZWN0KHtcbiAgbWFnbml0dWRlOiBKb2kubnVtYmVyKClcbiAgICAubWluKDApXG4gICAgLnJlcXVpcmVkKCksXG4gIHNjb3JlOiBKb2kubnVtYmVyKClcbiAgICAubWluKC0xKVxuICAgIC5tYXgoMSlcbiAgICAucmVxdWlyZWQoKSxcbn0pLnVua25vd24oKTtcblxuZXhwb3J0IHR5cGUgQ2xhc3NUeXBlID0ge1xuICBjbGFzc05hbWU6IHN0cmluZyxcbiAgY29uZmlkZW5jZTogbnVtYmVyLFxufTtcblxuZXhwb3J0IGNvbnN0IENsYXNzU2NoZW1hID0gSm9pLm9iamVjdCh7XG4gIGNsYXNzTmFtZTogSm9pLnN0cmluZygpLnJlcXVpcmVkKCksXG4gIGNvbmZpZGVuY2U6IEpvaS5udW1iZXIoKVxuICAgIC5taW4oMClcbiAgICAubWF4KDEpXG4gICAgLnJlcXVpcmVkKCksXG59KS51bmtub3duKCk7XG5cbmV4cG9ydCB0eXBlIFNlbnRlbmNlVHlwZSA9IHtcbiAgc2VudGltZW50OiBTZW50aW1lbnRUeXBlLFxuICB0ZXh0OiBUZXh0U3BhblR5cGUsXG59O1xuXG5leHBvcnQgY29uc3QgU2VudGVuY2VTY2hlbWEgPSBKb2kub2JqZWN0KHtcbiAgc2VudGltZW50OiBTZW50aW1lbnRTY2hlbWEucmVxdWlyZWQoKSxcbiAgdGV4dDogVGV4dFNwYW5TY2hlbWEucmVxdWlyZWQoKSxcbn0pLnVua25vd24oKTtcblxuZXhwb3J0IHR5cGUgU2VudGltZW50QW5hbHlzaXNSZXNwb25zZVR5cGUgPSB7fFxuICBkb2N1bWVudFNlbnRpbWVudDogU2VudGltZW50VHlwZSxcbiAgbGFuZ3VhZ2U6IFN1cHBvcnRlZExhbmd1YWdlVHlwZSxcbiAgc2VudGVuY2VzOiBTZW50ZW5jZVR5cGVbXSxcbnx9O1xuXG5leHBvcnQgY29uc3QgU2VudGltZW50QW5hbHlzaXNSZXNwb25zZVNjaGVtYSA9IEpvaS5vYmplY3Qoe1xuICBkb2N1bWVudFNlbnRpbWVudDogU2VudGltZW50U2NoZW1hLnJlcXVpcmVkKCksXG4gIGxhbmd1YWdlOiBTdXBwb3J0ZWRMYW5ndWFnZVNjaGVtYS5yZXF1aXJlZCgpLFxuICBzZW50ZW5jZXM6IEpvaS5hcnJheSgpXG4gICAgLml0ZW1zKFNlbnRlbmNlU2NoZW1hKVxuICAgIC5yZXF1aXJlZCgpLFxufSkudW5rbm93bigpO1xuXG5leHBvcnQgdHlwZSBGZWVkYmFja1R5cGUgPSAnZW1haWwnIHwgJ3R3aXR0ZXInO1xuXG5leHBvcnQgdHlwZSBGZWVkYmFja1NlbnRpbWVudEFuZENsYXNzaWZpY2F0aW9uVHlwZSA9IHt8XG4gIGNvbnRlbnRTZW50aW1lbnQ6IFNlbnRpbWVudFR5cGUsXG4gIGRvY3VtZW50Q2xhc3NpZmljYXRpb246IENsYXNzVHlwZVtdLFxuICBzZW50ZW5jZXM6IEFycmF5PHtcbiAgICBjbGFzc2lmaWNhdGlvbjogQ2xhc3NUeXBlLFxuICAgIC4uLlNlbnRlbmNlVHlwZSxcbiAgfT4sXG4gIHRvcERvY3VtZW50Q2xhc3NlczogQXJyYXk8c3RyaW5nPixcbiAgdG9wU2VudGVuY2VDbGFzc2VzOiBBcnJheTxzdHJpbmc+LFxufH07XG5cbmV4cG9ydCB0eXBlIEZlZWRiYWNrQW5hbHlzaXNVbnNhdmVkVHlwZSA9IHt8XG4gIC4uLkZlZWRiYWNrU2VudGltZW50QW5kQ2xhc3NpZmljYXRpb25UeXBlLFxuICBhY2NvdW50SWQ6IHN0cmluZyxcbiAgZmVlZGJhY2tJZDogc3RyaW5nLFxuICBmZWVkYmFja1R5cGU6IEZlZWRiYWNrVHlwZSxcbnx9O1xuXG5leHBvcnQgdHlwZSBGZWVkYmFja0FuYWx5c2lzVHlwZSA9IHtcbiAgLi4uRmVlZGJhY2tBbmFseXNpc1Vuc2F2ZWRUeXBlLFxuICAuLi5Nb2RlbFNhdmVkRmllbGRzVHlwZSxcbn07XG5cbmV4cG9ydCBjb25zdCBGZWVkYmFja0FuYWx5c2lzU2NoZW1hID0gSm9pLm9iamVjdCh7XG4gIGFjY291bnRJZDogSm9pLnN0cmluZygpLnJlcXVpcmVkKCksXG4gIGNvbnRlbnRTZW50aW1lbnQ6IFNlbnRpbWVudFNjaGVtYS5yZXF1aXJlZCgpLFxuICBkb2N1bWVudENsYXNzaWZpY2F0aW9uOiBKb2kuYXJyYXkoKVxuICAgIC5pdGVtcyhDbGFzc1NjaGVtYSlcbiAgICAucmVxdWlyZWQoKSxcbiAgZmVlZGJhY2tJZDogSm9pLnN0cmluZygpXG4gICAgLmd1aWQoKVxuICAgIC5kZWZhdWx0KCgpID0+IHV1aWQudjQoKSwgJ3V1aWQgdjQnKSxcbiAgZmVlZGJhY2tUeXBlOiBKb2kuc3RyaW5nKClcbiAgICAuYWxsb3coWydlbWFpbCcsICd0d2l0dGVyJ10pXG4gICAgLnJlcXVpcmVkKCksXG4gIGlkOiBKb2kuc3RyaW5nKClcbiAgICAuZ3VpZCgpXG4gICAgLmRlZmF1bHQoKCkgPT4gdXVpZC52NCgpLCAndXVpZCB2NCcpLFxuICBzZW50ZW5jZXM6IEpvaS5hcnJheSgpXG4gICAgLml0ZW1zKFxuICAgICAgU2VudGVuY2VTY2hlbWEua2V5cyh7XG4gICAgICAgIGNsYXNzaWZpY2F0aW9uOiBKb2kuYXJyYXkoKVxuICAgICAgICAgIC5pdGVtcyhDbGFzc1NjaGVtYSlcbiAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgIH0pLnJlcXVpcmVkKClcbiAgICApXG4gICAgLnJlcXVpcmVkKCksXG4gIHRvcERvY3VtZW50Q2xhc3NlczogSm9pLmFycmF5KClcbiAgICAuaXRlbXMoSm9pLnN0cmluZygpKVxuICAgIC5yZXF1aXJlZCgpLFxuICB0b3BTZW50ZW5jZUNsYXNzZXM6IEpvaS5hcnJheSgpXG4gICAgLml0ZW1zKEpvaS5zdHJpbmcoKSlcbiAgICAucmVxdWlyZWQoKSxcbn0pXG4gIC51bmtub3duKClcbiAgLnJlcXVpcmVkKCk7XG5cbmV4cG9ydCB0eXBlIFdhdHNvbkNsYXNzaWZ5UmVzcG9uc2VUeXBlID0ge1xuICBjbGFzc2VzOiBBcnJheTx7IGNsYXNzX25hbWU6IHN0cmluZywgY29uZmlkZW5jZTogbnVtYmVyIH0+LFxuICBjbGFzc2lmaWVyX2lkOiBzdHJpbmcsXG4gIHRleHQ6IHN0cmluZyxcbiAgdG9wX2NsYXNzOiBzdHJpbmcsXG4gIHVybDogc3RyaW5nLFxufTtcblxuZXhwb3J0IGNvbnN0IFdhdHNvbkNsYXNzaWZ5UmVzcG9uc2VTY2hlbWEgPSBKb2kub2JqZWN0KHtcbiAgY2xhc3NlczogSm9pLmFycmF5KClcbiAgICAuaXRlbXMoXG4gICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgY2xhc3NfbmFtZTogSm9pLnN0cmluZygpLnJlcXVpcmVkKCksXG4gICAgICAgIGNvbmZpZGVuY2U6IEpvaS5udW1iZXIoKVxuICAgICAgICAgIC5taW4oMClcbiAgICAgICAgICAubWF4KDEpXG4gICAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICB9KS51bmtub3duKClcbiAgICApXG4gICAgLnJlcXVpcmVkKCksXG4gIGNsYXNzaWZpZXJfaWQ6IEpvaS5zdHJpbmcoKS5yZXF1aXJlZCgpLFxuICB0ZXh0OiBKb2kuc3RyaW5nKCkucmVxdWlyZWQoKSxcbiAgdG9wX2NsYXNzOiBKb2kuc3RyaW5nKCkucmVxdWlyZWQoKSxcbiAgdXJsOiBKb2kuc3RyaW5nKClcbiAgICAudXJpKHsgYWxsb3dSZWxhdGl2ZTogdHJ1ZSB9KVxuICAgIC5yZXF1aXJlZCgpLFxufSk7XG5cbmV4cG9ydCB0eXBlIEVtYWlsRmVlZGJhY2tQb3N0Qm9keVR5cGUgPSB7fFxuICBjb250ZW50OiBzdHJpbmcsXG4gIGVtYWlsU2VudERhdGU6IHN0cmluZyxcbiAgZnJvbTogc3RyaW5nLFxuICBzdWJqZWN0OiBzdHJpbmcsXG4gIHRvOiBzdHJpbmcsXG58fTtcblxuZXhwb3J0IGNvbnN0IEVtYWlsRmVlZGJhY2tQb3N0Qm9keVNjaGVtYSA9IEpvaS5vYmplY3Qoe1xuICBjb250ZW50OiBKb2kuc3RyaW5nKCkucmVxdWlyZWQoKSxcbiAgZW1haWxTZW50RGF0ZTogSm9pLnN0cmluZygpXG4gICAgLmlzb0RhdGUoKVxuICAgIC5yZXF1aXJlZCgpLFxuICBmcm9tOiBKb2kuc3RyaW5nKClcbiAgICAuZW1haWwoKVxuICAgIC5yZXF1aXJlZCgpLFxuICBzdWJqZWN0OiBKb2kuc3RyaW5nKCkucmVxdWlyZWQoKSxcbiAgdG86IEpvaS5zdHJpbmcoKVxuICAgIC5lbWFpbCgpXG4gICAgLnJlcXVpcmVkKCksXG59KVxuICAudW5rbm93bigpXG4gIC5yZXF1aXJlZCgpO1xuXG5leHBvcnQgdHlwZSBFbWFpbEZlZWRiYWNrVW5zYXZlZFR5cGUgPSB7fFxuICAuLi5FbWFpbEZlZWRiYWNrUG9zdEJvZHlUeXBlLFxuICBhY2NvdW50SWQ6IHN0cmluZyxcbnx9O1xuXG5leHBvcnQgdHlwZSBFbWFpbEZlZWRiYWNrVHlwZSA9IHtcbiAgLi4uRW1haWxGZWVkYmFja1Vuc2F2ZWRUeXBlLFxuICAuLi5Nb2RlbFNhdmVkRmllbGRzVHlwZSxcbn07XG5cbmV4cG9ydCBjb25zdCBFbWFpbEZlZWRiYWNrU2NoZW1hID0gRW1haWxGZWVkYmFja1Bvc3RCb2R5U2NoZW1hLmtleXMoe1xuICBhY2NvdW50SWQ6IEpvaS5zdHJpbmcoKS5yZXF1aXJlZCgpLFxuICBpZDogSm9pLnN0cmluZygpXG4gICAgLmd1aWQoKVxuICAgIC5kZWZhdWx0KCgpID0+IHV1aWQudjQoKSwgJ3V1aWQgdjQnKSxcbn0pO1xuXG5leHBvcnQgdHlwZSBFbWFpbEZlZWRiYWNrV2l0aEFuYWx5c2lzVHlwZSA9IHtcbiAgLi4uRW1haWxGZWVkYmFja1R5cGUsXG4gIGFuYWx5c2lzOiBGZWVkYmFja0FuYWx5c2lzVHlwZSxcbn07XG5cbmV4cG9ydCB0eXBlIFR3aXR0ZXJGZWVkYmFja1Vuc2F2ZWRUeXBlID0ge3xcbiAgYWNjb3VudElkOiBzdHJpbmcsXG4gIHN0YXR1c0lkOiBzdHJpbmcsXG58fTtcblxuZXhwb3J0IHR5cGUgVHdpdHRlckZlZWRiYWNrVHlwZSA9IHtcbiAgLi4uVHdpdHRlckZlZWRiYWNrVW5zYXZlZFR5cGUsXG4gIC4uLk1vZGVsU2F2ZWRGaWVsZHNUeXBlLFxufTtcblxuZXhwb3J0IGNvbnN0IFR3aXR0ZXJGZWVkYmFja1NjaGVtYSA9IEpvaS5vYmplY3Qoe1xuICBhY2NvdW50SWQ6IEpvaS5zdHJpbmcoKS5yZXF1aXJlZCgpLFxuICBpZDogSm9pLnN0cmluZygpXG4gICAgLmd1aWQoKVxuICAgIC5kZWZhdWx0KCgpID0+IHV1aWQudjQoKSwgJ3V1aWQgdjQnKSxcbiAgc3RhdHVzSWQ6IEpvaS5zdHJpbmcoKS5yZXF1aXJlZCgpLFxufSlcbiAgLnVua25vd24oKVxuICAucmVxdWlyZWQoKTtcblxuZXhwb3J0IHR5cGUgVHdpdHRlckZlZWRiYWNrV2l0aEFuYWx5c2lzVHlwZSA9IHtcbiAgLi4uVHdpdHRlckZlZWRiYWNrVHlwZSxcbiAgYW5hbHlzaXM6IEZlZWRiYWNrQW5hbHlzaXNUeXBlLFxufTtcblxuLy8gY3VycmVudGx5IG9ubHkgMSB0aWVyXG5leHBvcnQgdHlwZSBBY2NvdW50VGllclR5cGUgPSAnZnJlZSc7XG5cbmV4cG9ydCB0eXBlIEFjY291bnRTZXR0aW5nUG9zdEJvZHlUeXBlID0ge3xcbiAgdHdpdHRlclNlYXJjaGVzOiBzdHJpbmdbXSxcbnx9O1xuXG5leHBvcnQgdHlwZSBBY2NvdW50U2V0dGluZ1Vuc2F2ZWRUeXBlID0ge3xcbiAgLi4uQWNjb3VudFNldHRpbmdQb3N0Qm9keVR5cGUsXG4gIGFjY291bnRJZDogc3RyaW5nLFxuICBmZWVkYmFja1VzYWdlQnlEYXRlOiB7XG4gICAgW2tleTogWWVhck1vbnRoQnVja2V0VHlwZV06IG51bWJlcixcbiAgfSxcbiAgdGllcjogQWNjb3VudFRpZXJUeXBlLFxufH07XG5cbmV4cG9ydCB0eXBlIEFjY291bnRTZXR0aW5nVHlwZSA9IHtcbiAgLi4uQWNjb3VudFNldHRpbmdVbnNhdmVkVHlwZSxcbiAgLi4uTW9kZWxTYXZlZEZpZWxkc1R5cGUsXG59O1xuXG5leHBvcnQgY29uc3QgQWNjb3VudFNldHRpbmdQb3N0Qm9keVNjaGVtYSA9IEpvaS5vYmplY3Qoe1xuICB0d2l0dGVyU2VhcmNoZXM6IEpvaS5hcnJheSgpXG4gICAgLml0ZW1zKEpvaS5zdHJpbmcoKS5yZXF1aXJlZCgpKVxuICAgIC5yZXF1aXJlZCgpLFxufSlcbiAgLnVua25vd24oKVxuICAucmVxdWlyZWQoKTtcblxuLy8gcHJldHRpZXIgd2lsbCByZW1vdmUgdGhlIHN1cnJvdW5kaW5nIC8qOjogKi8gd2hpY2ggaXMgbmVlZGVkIHNpbmNlIG90aGVyXG4vLyBwbHVnaW5zIGRvbid0IGZ1bGx5IHN1cHBvcnQgZmxvdyBvcGFndWUgdHlwZXMgeWV0XG4vKiBlc2xpbnQtZGlzYWJsZSBwcmV0dGllci9wcmV0dGllciAqL1xuLyo6OlxuZXhwb3J0IG9wYXF1ZSB0eXBlIFllYXJNb250aEJ1Y2tldFR5cGU6IHN0cmluZyA9IHN0cmluZztcbiovXG4vKiBlc2xpbnQtZW5hYmxlICovXG5cbmNvbnN0IFllYXJNb250aEJ1Y2tldFNjaGVtYSA9IEpvaS5zdHJpbmcoKS5yZWdleCgvXlxcZHs0fS1cXGR7Mn0kLyk7XG5cbmNvbnN0IHZhbGlkYXRlRW1haWxQb3N0Qm9keSA9IChcbiAgbWF5YmVZTUI6IHN0cmluZ1xuKTogUHJvbWlzZTxZZWFyTW9udGhCdWNrZXRUeXBlPiA9PlxuICBQcm9taXNlLnJlc29sdmUoKS50aGVuKCgpOiBQcm9taXNlPHN0cmluZz4gfCBZZWFyTW9udGhCdWNrZXRUeXBlID0+IHtcbiAgICBjb25zdCB7IGVycm9yLCB2YWx1ZSB9ID0gSm9pLnZhbGlkYXRlKG1heWJlWU1CLCBZZWFyTW9udGhCdWNrZXRTY2hlbWEpO1xuXG4gICAgaWYgKGVycm9yKSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyb3IuYW5ub3RhdGUodHJ1ZSkpO1xuICAgIH1cblxuICAgIHJldHVybiB2YWx1ZTtcbiAgfSk7XG5cbmV4cG9ydCBjb25zdCBnZXRZZWFyTW9udGhCdWNrZXQgPSAobWF5YmVZTUI6IHN0cmluZykgPT5cbiAgdmFsaWRhdGVFbWFpbFBvc3RCb2R5KG1heWJlWU1CKTtcbiJdfQ==
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TwitterFeedbackSchema = exports.EmailFeedbackSchema = exports.EmailFeedbackPostBodySchema = exports.WatsonClassifyResponseSchema = exports.FeedbackAnalysisSchema = exports.SentimentAnalysisResponseSchema = exports.SentenceSchema = exports.ClassSchema = exports.SentimentSchema = exports.TextSpanSchema = exports.SupportedLanguageSchema = undefined;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJTdXBwb3J0ZWRMYW5ndWFnZVNjaGVtYSIsInN0cmluZyIsInZhbGlkIiwiVGV4dFNwYW5TY2hlbWEiLCJvYmplY3QiLCJiZWdpbk9mZnNldCIsIm51bWJlciIsIm1pbiIsInJlcXVpcmVkIiwiY29udGVudCIsInVua25vd24iLCJTZW50aW1lbnRTY2hlbWEiLCJtYWduaXR1ZGUiLCJzY29yZSIsIm1heCIsIkNsYXNzU2NoZW1hIiwiY2xhc3NOYW1lIiwiY29uZmlkZW5jZSIsIlNlbnRlbmNlU2NoZW1hIiwic2VudGltZW50IiwidGV4dCIsIlNlbnRpbWVudEFuYWx5c2lzUmVzcG9uc2VTY2hlbWEiLCJkb2N1bWVudFNlbnRpbWVudCIsImxhbmd1YWdlIiwic2VudGVuY2VzIiwiYXJyYXkiLCJpdGVtcyIsIkZlZWRiYWNrQW5hbHlzaXNTY2hlbWEiLCJhY2NvdW50SWQiLCJjb250ZW50U2VudGltZW50IiwiZG9jdW1lbnRDbGFzc2lmaWNhdGlvbiIsImZlZWRiYWNrSWQiLCJndWlkIiwiZGVmYXVsdCIsInY0IiwiZmVlZGJhY2tUeXBlIiwiYWxsb3ciLCJpZCIsImtleXMiLCJjbGFzc2lmaWNhdGlvbiIsInRvcERvY3VtZW50Q2xhc3NlcyIsInRvcFNlbnRlbmNlQ2xhc3NlcyIsIldhdHNvbkNsYXNzaWZ5UmVzcG9uc2VTY2hlbWEiLCJjbGFzc2VzIiwiY2xhc3NfbmFtZSIsImNsYXNzaWZpZXJfaWQiLCJ0b3BfY2xhc3MiLCJ1cmwiLCJ1cmkiLCJhbGxvd1JlbGF0aXZlIiwiRW1haWxGZWVkYmFja1Bvc3RCb2R5U2NoZW1hIiwiZW1haWxTZW50RGF0ZSIsImlzb0RhdGUiLCJmcm9tIiwiZW1haWwiLCJzdWJqZWN0IiwidG8iLCJFbWFpbEZlZWRiYWNrU2NoZW1hIiwiVHdpdHRlckZlZWRiYWNrU2NoZW1hIiwic3RhdHVzSWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFFQTs7OztBQUNBOzs7Ozs7QUFvQk8s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QWF4Q0UsT0Fid0MsR0FjeENGLFFBZHdDLEVBQXBDOztBQTBCQSxJQUFNaUQsb0RBQXNCUCw0QkFBNEJaLElBQTVCLENBQWlDO0FBQ2xFVixhQUFXLHFCQUFJM0IsTUFBSixHQUFhTyxRQUFiLEVBRHVEO0FBRWxFNkIsTUFBSSxxQkFBSXBDLE1BQUosR0FDRCtCLElBREMsR0FFREMsT0FGQyxDQUVPO0FBQUEsV0FBTSxlQUFLQyxFQUFMLEVBQU47QUFBQSxHQUZQLEVBRXdCLFNBRnhCO0FBRjhELENBQWpDLENBQTVCOztBQXNCQSxJQUFNd0Isd0RBQXdCLHFCQUFJdEQsTUFBSixDQUFXO0FBQzlDd0IsYUFBVyxxQkFBSTNCLE1BQUosR0FBYU8sUUFBYixFQURtQztBQUU5QzZCLE1BQUkscUJBQUlwQyxNQUFKLEdBQ0QrQixJQURDLEdBRURDLE9BRkMsQ0FFTztBQUFBLFdBQU0sZUFBS0MsRUFBTCxFQUFOO0FBQUEsR0FGUCxFQUV3QixTQUZ4QixDQUYwQztBQUs5Q3lCLFlBQVUscUJBQUkxRCxNQUFKLEdBQWFPLFFBQWI7QUFMb0MsQ0FBWCxFQU9sQ0UsT0FQa0MsR0FRbENGLFFBUmtDLEVBQTlCIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQGZsb3dcblxuaW1wb3J0IEpvaSBmcm9tICdqb2ktYnJvd3Nlcic7XG5pbXBvcnQgdXVpZCBmcm9tICd1dWlkJztcblxuZXhwb3J0IHR5cGUgTW9kZWxTYXZlZEZpZWxkc1R5cGUgPSB7fFxuICBjcmVhdGVkQXQ6IHN0cmluZyxcbiAgaWQ6IHN0cmluZyxcbiAgdXBkYXRlZEF0Pzogc3RyaW5nLFxufH07XG5cbmV4cG9ydCB0eXBlIFN1cHBvcnRlZExhbmd1YWdlVHlwZSA9XG4gIHwgJ3poJ1xuICB8ICd6aC1IYW50J1xuICB8ICdlbidcbiAgfCAnZnInXG4gIHwgJ2RlJ1xuICB8ICdpdCdcbiAgfCAnamEnXG4gIHwgJ2tvJ1xuICB8ICdwdCdcbiAgfCAnZXMnO1xuXG5leHBvcnQgY29uc3QgU3VwcG9ydGVkTGFuZ3VhZ2VTY2hlbWEgPSBKb2kuc3RyaW5nKCkudmFsaWQoW1xuICAnemgnLFxuICAnemgtSGFudCcsXG4gICdlbicsXG4gICdmcicsXG4gICdkZScsXG4gICdpdCcsXG4gICdqYScsXG4gICdrbycsXG4gICdwdCcsXG4gICdlcycsXG5dKTtcblxudHlwZSBUZXh0U3BhblR5cGUgPSB7XG4gIGJlZ2luT2Zmc2V0OiBudW1iZXIsXG4gIGNvbnRlbnQ6IHN0cmluZyxcbn07XG5cbmV4cG9ydCBjb25zdCBUZXh0U3BhblNjaGVtYSA9IEpvaS5vYmplY3Qoe1xuICBiZWdpbk9mZnNldDogSm9pLm51bWJlcigpXG4gICAgLm1pbigtMSlcbiAgICAucmVxdWlyZWQoKSxcbiAgY29udGVudDogSm9pLnN0cmluZygpLnJlcXVpcmVkKCksXG59KS51bmtub3duKCk7XG5cbmV4cG9ydCB0eXBlIFNlbnRpbWVudFR5cGUgPSB7XG4gIG1hZ25pdHVkZTogbnVtYmVyLFxuICBzY29yZTogbnVtYmVyLFxufTtcblxuZXhwb3J0IGNvbnN0IFNlbnRpbWVudFNjaGVtYSA9IEpvaS5vYmplY3Qoe1xuICBtYWduaXR1ZGU6IEpvaS5udW1iZXIoKVxuICAgIC5taW4oMClcbiAgICAucmVxdWlyZWQoKSxcbiAgc2NvcmU6IEpvaS5udW1iZXIoKVxuICAgIC5taW4oLTEpXG4gICAgLm1heCgxKVxuICAgIC5yZXF1aXJlZCgpLFxufSkudW5rbm93bigpO1xuXG5leHBvcnQgdHlwZSBDbGFzc1R5cGUgPSB7XG4gIGNsYXNzTmFtZTogc3RyaW5nLFxuICBjb25maWRlbmNlOiBudW1iZXIsXG59O1xuXG5leHBvcnQgY29uc3QgQ2xhc3NTY2hlbWEgPSBKb2kub2JqZWN0KHtcbiAgY2xhc3NOYW1lOiBKb2kuc3RyaW5nKCkucmVxdWlyZWQoKSxcbiAgY29uZmlkZW5jZTogSm9pLm51bWJlcigpXG4gICAgLm1pbigwKVxuICAgIC5tYXgoMSlcbiAgICAucmVxdWlyZWQoKSxcbn0pLnVua25vd24oKTtcblxuZXhwb3J0IHR5cGUgU2VudGVuY2VUeXBlID0ge1xuICBzZW50aW1lbnQ6IFNlbnRpbWVudFR5cGUsXG4gIHRleHQ6IFRleHRTcGFuVHlwZSxcbn07XG5cbmV4cG9ydCBjb25zdCBTZW50ZW5jZVNjaGVtYSA9IEpvaS5vYmplY3Qoe1xuICBzZW50aW1lbnQ6IFNlbnRpbWVudFNjaGVtYS5yZXF1aXJlZCgpLFxuICB0ZXh0OiBUZXh0U3BhblNjaGVtYS5yZXF1aXJlZCgpLFxufSkudW5rbm93bigpO1xuXG5leHBvcnQgdHlwZSBTZW50aW1lbnRBbmFseXNpc1Jlc3BvbnNlVHlwZSA9IHt8XG4gIGRvY3VtZW50U2VudGltZW50OiBTZW50aW1lbnRUeXBlLFxuICBsYW5ndWFnZTogU3VwcG9ydGVkTGFuZ3VhZ2VUeXBlLFxuICBzZW50ZW5jZXM6IFNlbnRlbmNlVHlwZVtdLFxufH07XG5cbmV4cG9ydCBjb25zdCBTZW50aW1lbnRBbmFseXNpc1Jlc3BvbnNlU2NoZW1hID0gSm9pLm9iamVjdCh7XG4gIGRvY3VtZW50U2VudGltZW50OiBTZW50aW1lbnRTY2hlbWEucmVxdWlyZWQoKSxcbiAgbGFuZ3VhZ2U6IFN1cHBvcnRlZExhbmd1YWdlU2NoZW1hLnJlcXVpcmVkKCksXG4gIHNlbnRlbmNlczogSm9pLmFycmF5KClcbiAgICAuaXRlbXMoU2VudGVuY2VTY2hlbWEpXG4gICAgLnJlcXVpcmVkKCksXG59KS51bmtub3duKCk7XG5cbmV4cG9ydCB0eXBlIEZlZWRiYWNrVHlwZSA9ICdlbWFpbCcgfCAndHdpdHRlcic7XG5cbmV4cG9ydCB0eXBlIEZlZWRiYWNrU2VudGltZW50QW5kQ2xhc3NpZmljYXRpb25UeXBlID0ge3xcbiAgY29udGVudFNlbnRpbWVudDogU2VudGltZW50VHlwZSxcbiAgZG9jdW1lbnRDbGFzc2lmaWNhdGlvbjogQ2xhc3NUeXBlW10sXG4gIHNlbnRlbmNlczogQXJyYXk8e1xuICAgIGNsYXNzaWZpY2F0aW9uOiBDbGFzc1R5cGUsXG4gICAgLi4uU2VudGVuY2VUeXBlLFxuICB9PixcbiAgdG9wRG9jdW1lbnRDbGFzc2VzOiBBcnJheTxzdHJpbmc+LFxuICB0b3BTZW50ZW5jZUNsYXNzZXM6IEFycmF5PHN0cmluZz4sXG58fTtcblxuZXhwb3J0IHR5cGUgRmVlZGJhY2tBbmFseXNpc1Vuc2F2ZWRUeXBlID0ge3xcbiAgLi4uRmVlZGJhY2tTZW50aW1lbnRBbmRDbGFzc2lmaWNhdGlvblR5cGUsXG4gIGFjY291bnRJZDogc3RyaW5nLFxuICBmZWVkYmFja0lkOiBzdHJpbmcsXG4gIGZlZWRiYWNrVHlwZTogRmVlZGJhY2tUeXBlLFxufH07XG5cbmV4cG9ydCB0eXBlIEZlZWRiYWNrQW5hbHlzaXNUeXBlID0ge1xuICAuLi5GZWVkYmFja0FuYWx5c2lzVW5zYXZlZFR5cGUsXG4gIC4uLk1vZGVsU2F2ZWRGaWVsZHNUeXBlLFxufTtcblxuZXhwb3J0IGNvbnN0IEZlZWRiYWNrQW5hbHlzaXNTY2hlbWEgPSBKb2kub2JqZWN0KHtcbiAgYWNjb3VudElkOiBKb2kuc3RyaW5nKCkucmVxdWlyZWQoKSxcbiAgY29udGVudFNlbnRpbWVudDogU2VudGltZW50U2NoZW1hLnJlcXVpcmVkKCksXG4gIGRvY3VtZW50Q2xhc3NpZmljYXRpb246IEpvaS5hcnJheSgpXG4gICAgLml0ZW1zKENsYXNzU2NoZW1hKVxuICAgIC5yZXF1aXJlZCgpLFxuICBmZWVkYmFja0lkOiBKb2kuc3RyaW5nKClcbiAgICAuZ3VpZCgpXG4gICAgLmRlZmF1bHQoKCkgPT4gdXVpZC52NCgpLCAndXVpZCB2NCcpLFxuICBmZWVkYmFja1R5cGU6IEpvaS5zdHJpbmcoKVxuICAgIC5hbGxvdyhbJ2VtYWlsJywgJ3R3aXR0ZXInXSlcbiAgICAucmVxdWlyZWQoKSxcbiAgaWQ6IEpvaS5zdHJpbmcoKVxuICAgIC5ndWlkKClcbiAgICAuZGVmYXVsdCgoKSA9PiB1dWlkLnY0KCksICd1dWlkIHY0JyksXG4gIHNlbnRlbmNlczogSm9pLmFycmF5KClcbiAgICAuaXRlbXMoXG4gICAgICBTZW50ZW5jZVNjaGVtYS5rZXlzKHtcbiAgICAgICAgY2xhc3NpZmljYXRpb246IEpvaS5hcnJheSgpXG4gICAgICAgICAgLml0ZW1zKENsYXNzU2NoZW1hKVxuICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgfSkucmVxdWlyZWQoKVxuICAgIClcbiAgICAucmVxdWlyZWQoKSxcbiAgdG9wRG9jdW1lbnRDbGFzc2VzOiBKb2kuYXJyYXkoKVxuICAgIC5pdGVtcyhKb2kuc3RyaW5nKCkpXG4gICAgLnJlcXVpcmVkKCksXG4gIHRvcFNlbnRlbmNlQ2xhc3NlczogSm9pLmFycmF5KClcbiAgICAuaXRlbXMoSm9pLnN0cmluZygpKVxuICAgIC5yZXF1aXJlZCgpLFxufSlcbiAgLnVua25vd24oKVxuICAucmVxdWlyZWQoKTtcblxuZXhwb3J0IHR5cGUgV2F0c29uQ2xhc3NpZnlSZXNwb25zZVR5cGUgPSB7XG4gIGNsYXNzZXM6IEFycmF5PHsgY2xhc3NfbmFtZTogc3RyaW5nLCBjb25maWRlbmNlOiBudW1iZXIgfT4sXG4gIGNsYXNzaWZpZXJfaWQ6IHN0cmluZyxcbiAgdGV4dDogc3RyaW5nLFxuICB0b3BfY2xhc3M6IHN0cmluZyxcbiAgdXJsOiBzdHJpbmcsXG59O1xuXG5leHBvcnQgY29uc3QgV2F0c29uQ2xhc3NpZnlSZXNwb25zZVNjaGVtYSA9IEpvaS5vYmplY3Qoe1xuICBjbGFzc2VzOiBKb2kuYXJyYXkoKVxuICAgIC5pdGVtcyhcbiAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICBjbGFzc19uYW1lOiBKb2kuc3RyaW5nKCkucmVxdWlyZWQoKSxcbiAgICAgICAgY29uZmlkZW5jZTogSm9pLm51bWJlcigpXG4gICAgICAgICAgLm1pbigwKVxuICAgICAgICAgIC5tYXgoMSlcbiAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgIH0pLnVua25vd24oKVxuICAgIClcbiAgICAucmVxdWlyZWQoKSxcbiAgY2xhc3NpZmllcl9pZDogSm9pLnN0cmluZygpLnJlcXVpcmVkKCksXG4gIHRleHQ6IEpvaS5zdHJpbmcoKS5yZXF1aXJlZCgpLFxuICB0b3BfY2xhc3M6IEpvaS5zdHJpbmcoKS5yZXF1aXJlZCgpLFxuICB1cmw6IEpvaS5zdHJpbmcoKVxuICAgIC51cmkoeyBhbGxvd1JlbGF0aXZlOiB0cnVlIH0pXG4gICAgLnJlcXVpcmVkKCksXG59KTtcblxuZXhwb3J0IHR5cGUgRW1haWxGZWVkYmFja1Bvc3RCb2R5VHlwZSA9IHt8XG4gIGNvbnRlbnQ6IHN0cmluZyxcbiAgZW1haWxTZW50RGF0ZTogc3RyaW5nLFxuICBmcm9tOiBzdHJpbmcsXG4gIHN1YmplY3Q6IHN0cmluZyxcbiAgdG86IHN0cmluZyxcbnx9O1xuXG5leHBvcnQgY29uc3QgRW1haWxGZWVkYmFja1Bvc3RCb2R5U2NoZW1hID0gSm9pLm9iamVjdCh7XG4gIGNvbnRlbnQ6IEpvaS5zdHJpbmcoKS5yZXF1aXJlZCgpLFxuICBlbWFpbFNlbnREYXRlOiBKb2kuc3RyaW5nKClcbiAgICAuaXNvRGF0ZSgpXG4gICAgLnJlcXVpcmVkKCksXG4gIGZyb206IEpvaS5zdHJpbmcoKVxuICAgIC5lbWFpbCgpXG4gICAgLnJlcXVpcmVkKCksXG4gIHN1YmplY3Q6IEpvaS5zdHJpbmcoKS5yZXF1aXJlZCgpLFxuICB0bzogSm9pLnN0cmluZygpXG4gICAgLmVtYWlsKClcbiAgICAucmVxdWlyZWQoKSxcbn0pXG4gIC51bmtub3duKClcbiAgLnJlcXVpcmVkKCk7XG5cbmV4cG9ydCB0eXBlIEVtYWlsRmVlZGJhY2tVbnNhdmVkVHlwZSA9IHt8XG4gIC4uLkVtYWlsRmVlZGJhY2tQb3N0Qm9keVR5cGUsXG4gIGFjY291bnRJZDogc3RyaW5nLFxufH07XG5cbmV4cG9ydCB0eXBlIEVtYWlsRmVlZGJhY2tUeXBlID0ge1xuICAuLi5FbWFpbEZlZWRiYWNrVW5zYXZlZFR5cGUsXG4gIC4uLk1vZGVsU2F2ZWRGaWVsZHNUeXBlLFxufTtcblxuZXhwb3J0IGNvbnN0IEVtYWlsRmVlZGJhY2tTY2hlbWEgPSBFbWFpbEZlZWRiYWNrUG9zdEJvZHlTY2hlbWEua2V5cyh7XG4gIGFjY291bnRJZDogSm9pLnN0cmluZygpLnJlcXVpcmVkKCksXG4gIGlkOiBKb2kuc3RyaW5nKClcbiAgICAuZ3VpZCgpXG4gICAgLmRlZmF1bHQoKCkgPT4gdXVpZC52NCgpLCAndXVpZCB2NCcpLFxufSk7XG5cbmV4cG9ydCB0eXBlIEVtYWlsRmVlZGJhY2tXaXRoQW5hbHlzaXNUeXBlID0ge1xuICAuLi5FbWFpbEZlZWRiYWNrVHlwZSxcbiAgYW5hbHlzaXM6IEZlZWRiYWNrQW5hbHlzaXNUeXBlLFxufTtcblxuZXhwb3J0IHR5cGUgVHdpdHRlckZlZWRiYWNrVW5zYXZlZFR5cGUgPSB7fFxuICBhY2NvdW50SWQ6IHN0cmluZyxcbiAgc3RhdHVzSWQ6IHN0cmluZyxcbnx9O1xuXG5leHBvcnQgdHlwZSBUd2l0dGVyRmVlZGJhY2tUeXBlID0ge1xuICAuLi5Ud2l0dGVyRmVlZGJhY2tVbnNhdmVkVHlwZSxcbiAgLi4uTW9kZWxTYXZlZEZpZWxkc1R5cGUsXG59O1xuXG5leHBvcnQgY29uc3QgVHdpdHRlckZlZWRiYWNrU2NoZW1hID0gSm9pLm9iamVjdCh7XG4gIGFjY291bnRJZDogSm9pLnN0cmluZygpLnJlcXVpcmVkKCksXG4gIGlkOiBKb2kuc3RyaW5nKClcbiAgICAuZ3VpZCgpXG4gICAgLmRlZmF1bHQoKCkgPT4gdXVpZC52NCgpLCAndXVpZCB2NCcpLFxuICBzdGF0dXNJZDogSm9pLnN0cmluZygpLnJlcXVpcmVkKCksXG59KVxuICAudW5rbm93bigpXG4gIC5yZXF1aXJlZCgpO1xuXG5leHBvcnQgdHlwZSBUd2l0dGVyRmVlZGJhY2tXaXRoQW5hbHlzaXNUeXBlID0ge1xuICAuLi5Ud2l0dGVyRmVlZGJhY2tUeXBlLFxuICBhbmFseXNpczogRmVlZGJhY2tBbmFseXNpc1R5cGUsXG59O1xuIl19
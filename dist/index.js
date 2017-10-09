'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AccountSettingSchema = exports.AccountSettingPostBodySchema = exports.TwitterFeedbackWithMaybeAnalysisSchema = exports.TwitterFeedbackSchema = exports.EmailFeedbackWithMaybeAnalysisSchema = exports.EmailFeedbackSchema = exports.EmailFeedbackPostBodySchema = exports.WatsonClassifyResponseSchema = exports.FeedbackAnalysisSchema = exports.UserSchema = exports.EmailUserSchema = exports.TwitterUserSchema = exports.SentimentAnalysisResponseSchema = exports.SentenceSchema = exports.CategorySchema = exports.SentimentSchema = exports.TextSpanSchema = exports.SupportedLanguageSchema = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

// https://github.com/benmosher/eslint-plugin-import/issues/921
/* eslint-disable import/named */


var _joiBrowser = require('joi-browser');

var _joiBrowser2 = _interopRequireDefault(_joiBrowser);

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

var _YearMonthBucket = require('./YearMonthBucket');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-enable */

var ModelSavedFieldsSchema = {
  accountId: _joiBrowser2.default.string().required(),
  createdAt: _joiBrowser2.default.string().isoDate().required(),
  id: _joiBrowser2.default.string().guid().default(function () {
    return _uuid2.default.v4();
  }, 'uuid v4'),
  updatedAt: _joiBrowser2.default.string().isoDate()
};

var SupportedLanguageSchema = exports.SupportedLanguageSchema = _joiBrowser2.default.string().valid(['zh', 'zh-Hant', 'en', 'fr', 'de', 'it', 'ja', 'ko', 'pt', 'es']);

var TextSpanSchema = exports.TextSpanSchema = _joiBrowser2.default.object({
  beginOffset: _joiBrowser2.default.number().min(-1).required(),
  content: _joiBrowser2.default.string().required()
}).unknown();

var SentimentSchema = exports.SentimentSchema = _joiBrowser2.default.object({
  magnitude: _joiBrowser2.default.number().min(0).required(),
  score: _joiBrowser2.default.number().min(-1).max(1).required()
}).unknown();

var CategorySchema = exports.CategorySchema = _joiBrowser2.default.object({
  categoryName: _joiBrowser2.default.string().required(),
  confidence: _joiBrowser2.default.number().min(0).max(1).required()
}).unknown();

var SentenceSchema = exports.SentenceSchema = _joiBrowser2.default.object({
  sentiment: SentimentSchema.required(),
  text: TextSpanSchema.required()
}).unknown();

var SentimentAnalysisResponseSchema = exports.SentimentAnalysisResponseSchema = _joiBrowser2.default.object({
  documentSentiment: SentimentSchema.required(),
  language: SupportedLanguageSchema.required(),
  sentences: _joiBrowser2.default.array().items(SentenceSchema).default(function () {
    return [];
  }, 'Do not allow undefined or null to come out of the DB')
}).unknown();

var TwitterUserSchema = exports.TwitterUserSchema = _joiBrowser2.default.object({
  avatarUrl: _joiBrowser2.default.string().uri().required(),
  id: _joiBrowser2.default.string().required(),
  username: _joiBrowser2.default.string().required()
}).unknown();

var EmailUserSchema = exports.EmailUserSchema = _joiBrowser2.default.object({
  id: _joiBrowser2.default.string().email().required()
}).unknown();

var UserSchema = exports.UserSchema = _joiBrowser2.default.compile([TwitterUserSchema, EmailUserSchema]);

var FeedbackAnalysisSchema = exports.FeedbackAnalysisSchema = _joiBrowser2.default.object(_extends({}, ModelSavedFieldsSchema, {
  contentSentiment: SentimentSchema.required(),
  documentCategorization: _joiBrowser2.default.array().items(CategorySchema).default(function () {
    return [];
  }, 'Do not allow undefined or null to come out of the DB'),
  feedbackId: _joiBrowser2.default.string().guid().default(function () {
    return _uuid2.default.v4();
  }, 'uuid v4'),
  feedbackType: _joiBrowser2.default.string().allow(['email', 'twitter']).required(),
  sentences: _joiBrowser2.default.array().items(SentenceSchema.keys({
    categorization: _joiBrowser2.default.array().items(CategorySchema).default(function () {
      return [];
    }, 'Do not allow undefined or null to come out of the DB')
  }).required()).default(function () {
    return [];
  }, 'Do not allow undefined or null to come out of the DB'),
  topDocumentCategories: _joiBrowser2.default.array().items(_joiBrowser2.default.string()).default(function () {
    return [];
  }, 'Do not allow undefined or null to come out of the DB'),
  topSentenceCategories: _joiBrowser2.default.array().items(_joiBrowser2.default.string()).default(function () {
    return [];
  }, 'Do not allow undefined or null to come out of the DB'),
  user: UserSchema,
  userId: _joiBrowser2.default.string().required()
})).unknown().required();

var WatsonClassifyResponseSchema = exports.WatsonClassifyResponseSchema = _joiBrowser2.default.object({
  classes: _joiBrowser2.default.array().items(_joiBrowser2.default.object({
    class_name: _joiBrowser2.default.string().required(),
    confidence: _joiBrowser2.default.number().min(0).max(1).required()
  }).unknown()).default(function () {
    return [];
  }, 'Do not allow undefined or null to come out of the DB'),
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

var EmailFeedbackSchema = exports.EmailFeedbackSchema = EmailFeedbackPostBodySchema.keys(_extends({}, ModelSavedFieldsSchema)).unknown().required();

var EmailFeedbackWithMaybeAnalysisSchema = exports.EmailFeedbackWithMaybeAnalysisSchema = EmailFeedbackSchema.keys({
  analysis: FeedbackAnalysisSchema
}).unknown().required();

var TwitterFeedbackSchema = exports.TwitterFeedbackSchema = _joiBrowser2.default.object(_extends({}, ModelSavedFieldsSchema, {
  statusId: _joiBrowser2.default.string().required(),
  user: TwitterUserSchema.required()
})).unknown().required();

var TwitterFeedbackWithMaybeAnalysisSchema = exports.TwitterFeedbackWithMaybeAnalysisSchema = TwitterFeedbackSchema.keys({
  analysis: FeedbackAnalysisSchema
}).unknown().required();

var AccountSettingPostBodySchema = exports.AccountSettingPostBodySchema = _joiBrowser2.default.object({
  twitterSearches: _joiBrowser2.default.array().items(_joiBrowser2.default.string()).default(function () {
    return [];
  }, 'Do not allow undefined or null to come out of the DB')
}).unknown().required();

var AccountSettingSchema = exports.AccountSettingSchema = _joiBrowser2.default.object(_extends({}, ModelSavedFieldsSchema, {
  feedbackUsageByDate: _joiBrowser2.default.object().pattern(_YearMonthBucket.YearMonthBucketRegex, _joiBrowser2.default.number().min(0).required()).required(),
  id: _joiBrowser2.default.string().required(),
  tier: _joiBrowser2.default.string().valid(['notApproved', 'free']).required(),
  twitterSearches: _joiBrowser2.default.array().items(_joiBrowser2.default.string()).default(function () {
    return [];
  }, 'Do not allow undefined or null to come out of the DB')
})).unknown().required();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJNb2RlbFNhdmVkRmllbGRzU2NoZW1hIiwiYWNjb3VudElkIiwic3RyaW5nIiwicmVxdWlyZWQiLCJjcmVhdGVkQXQiLCJpc29EYXRlIiwiaWQiLCJndWlkIiwiZGVmYXVsdCIsInY0IiwidXBkYXRlZEF0IiwiU3VwcG9ydGVkTGFuZ3VhZ2VTY2hlbWEiLCJ2YWxpZCIsIlRleHRTcGFuU2NoZW1hIiwib2JqZWN0IiwiYmVnaW5PZmZzZXQiLCJudW1iZXIiLCJtaW4iLCJjb250ZW50IiwidW5rbm93biIsIlNlbnRpbWVudFNjaGVtYSIsIm1hZ25pdHVkZSIsInNjb3JlIiwibWF4IiwiQ2F0ZWdvcnlTY2hlbWEiLCJjYXRlZ29yeU5hbWUiLCJjb25maWRlbmNlIiwiU2VudGVuY2VTY2hlbWEiLCJzZW50aW1lbnQiLCJ0ZXh0IiwiU2VudGltZW50QW5hbHlzaXNSZXNwb25zZVNjaGVtYSIsImRvY3VtZW50U2VudGltZW50IiwibGFuZ3VhZ2UiLCJzZW50ZW5jZXMiLCJhcnJheSIsIml0ZW1zIiwiVHdpdHRlclVzZXJTY2hlbWEiLCJhdmF0YXJVcmwiLCJ1cmkiLCJ1c2VybmFtZSIsIkVtYWlsVXNlclNjaGVtYSIsImVtYWlsIiwiVXNlclNjaGVtYSIsImNvbXBpbGUiLCJGZWVkYmFja0FuYWx5c2lzU2NoZW1hIiwiY29udGVudFNlbnRpbWVudCIsImRvY3VtZW50Q2F0ZWdvcml6YXRpb24iLCJmZWVkYmFja0lkIiwiZmVlZGJhY2tUeXBlIiwiYWxsb3ciLCJrZXlzIiwiY2F0ZWdvcml6YXRpb24iLCJ0b3BEb2N1bWVudENhdGVnb3JpZXMiLCJ0b3BTZW50ZW5jZUNhdGVnb3JpZXMiLCJ1c2VyIiwidXNlcklkIiwiV2F0c29uQ2xhc3NpZnlSZXNwb25zZVNjaGVtYSIsImNsYXNzZXMiLCJjbGFzc19uYW1lIiwiY2xhc3NpZmllcl9pZCIsInRvcF9jbGFzcyIsInVybCIsImFsbG93UmVsYXRpdmUiLCJFbWFpbEZlZWRiYWNrUG9zdEJvZHlTY2hlbWEiLCJlbWFpbFNlbnREYXRlIiwiZnJvbSIsInN1YmplY3QiLCJ0byIsIkVtYWlsRmVlZGJhY2tTY2hlbWEiLCJFbWFpbEZlZWRiYWNrV2l0aE1heWJlQW5hbHlzaXNTY2hlbWEiLCJhbmFseXNpcyIsIlR3aXR0ZXJGZWVkYmFja1NjaGVtYSIsInN0YXR1c0lkIiwiVHdpdHRlckZlZWRiYWNrV2l0aE1heWJlQW5hbHlzaXNTY2hlbWEiLCJBY2NvdW50U2V0dGluZ1Bvc3RCb2R5U2NoZW1hIiwidHdpdHRlclNlYXJjaGVzIiwiQWNjb3VudFNldHRpbmdTY2hlbWEiLCJmZWVkYmFja1VzYWdlQnlEYXRlIiwicGF0dGVybiIsInRpZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUtBO0FBQ0E7OztBQUpBOzs7O0FBQ0E7Ozs7QUFJQTs7OztBQUlBOztBQVNBLElBQU1BLHlCQUF5QjtBQUM3QkMsYUFBVyxxQkFBSUMsTUFBSixHQUFhQyxRQUFiLEVBRGtCO0FBRTdCQyxhQUFXLHFCQUFJRixNQUFKLEdBQ1JHLE9BRFEsR0FFUkYsUUFGUSxFQUZrQjtBQUs3QkcsTUFBSSxxQkFBSUosTUFBSixHQUNESyxJQURDLEdBRURDLE9BRkMsQ0FFTztBQUFBLFdBQU0sZUFBS0MsRUFBTCxFQUFOO0FBQUEsR0FGUCxFQUV3QixTQUZ4QixDQUx5QjtBQVE3QkMsYUFBVyxxQkFBSVIsTUFBSixHQUFhRyxPQUFiO0FBUmtCLENBQS9COztBQXVCTyxJQUFNTSw0REFBMEIscUJBQUlULE1BQUosR0FBYVUsS0FBYixDQUFtQixDQUN4RCxJQUR3RCxFQUV4RCxTQUZ3RCxFQUd4RCxJQUh3RCxFQUl4RCxJQUp3RCxFQUt4RCxJQUx3RCxFQU14RCxJQU53RCxFQU94RCxJQVB3RCxFQVF4RCxJQVJ3RCxFQVN4RCxJQVR3RCxFQVV4RCxJQVZ3RCxDQUFuQixDQUFoQzs7QUFrQkEsSUFBTUMsMENBQWlCLHFCQUFJQyxNQUFKLENBQVc7QUFDdkNDLGVBQWEscUJBQUlDLE1BQUosR0FDVkMsR0FEVSxD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Q3JENkQsbUJBQWlCLHFCQUFJekMsS0FBSixHQUNkQyxLQURjLENBQ1IscUJBQUlqQyxNQUFKLEVBRFEsRUFFZE0sT0FGYyxDQUVOO0FBQUEsV0FBTSxFQUFOO0FBQUEsR0FGTSxFQUVJLHNEQUZKO0FBRG9DLENBQVgsRUFLekNXLE9BTHlDLEdBTXpDaEIsUUFOeUMsRUFBckM7O0FBc0JBLElBQU15RSxzREFBdUIscUJBQUk5RCxNQUFKLGNBQy9CZCxzQkFEK0I7QUFFbEM2RSx1QkFBcUIscUJBQUkvRCxNQUFKLEdBQ2xCZ0UsT0FEa0Isd0NBR2pCLHFCQUFJOUQsTUFBSixHQUNHQyxHQURILENBQ08sQ0FEUCxFQUVHZCxRQUZILEVBSGlCLEVBT2xCQSxRQVBrQixFQUZhO0FBVWxDRyxNQUFJLHFCQUFJSixNQUFKLEdBQWFDLFFBQWIsRUFWOEI7QUFXbEM0RSxRQUFNLHFCQUFJN0UsTUFBSixHQUNIVSxLQURHLENBQ0csQ0FBQyxhQUFELEVBQWdCLE1BQWhCLENBREgsRUFFSFQsUUFGRyxFQVg0QjtBQWNsQ3dFLG1CQUFpQixxQkFBSXpDLEtBQUosR0FDZEMsS0FEYyxDQUNSLHFCQUFJakMsTUFBSixFQURRLEVBRWRNLE9BRmMsQ0FFTjtBQUFBLFdBQU0sRUFBTjtBQUFBLEdBRk0sRUFFSSxzREFGSjtBQWRpQixJQWtCakNXLE9BbEJpQyxHQW1CakNoQixRQW5CaUMsRUFBN0IiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBAZmxvd1xuXG5pbXBvcnQgSm9pIGZyb20gJ2pvaS1icm93c2VyJztcbmltcG9ydCB1dWlkIGZyb20gJ3V1aWQnO1xuXG4vLyBodHRwczovL2dpdGh1Yi5jb20vYmVubW9zaGVyL2VzbGludC1wbHVnaW4taW1wb3J0L2lzc3Vlcy85MjFcbi8qIGVzbGludC1kaXNhYmxlIGltcG9ydC9uYW1lZCAqL1xuaW1wb3J0IHtcbiAgWWVhck1vbnRoQnVja2V0UmVnZXgsXG4gIHR5cGUgWWVhck1vbnRoQnVja2V0VHlwZSxcbn0gZnJvbSAnLi9ZZWFyTW9udGhCdWNrZXQnO1xuLyogZXNsaW50LWVuYWJsZSAqL1xuXG5leHBvcnQgdHlwZSBNb2RlbFNhdmVkRmllbGRzVHlwZSA9IHt8XG4gIGFjY291bnRJZDogc3RyaW5nLFxuICBjcmVhdGVkQXQ6IHN0cmluZyxcbiAgaWQ6IHN0cmluZyxcbiAgdXBkYXRlZEF0Pzogc3RyaW5nLFxufH07XG5cbmNvbnN0IE1vZGVsU2F2ZWRGaWVsZHNTY2hlbWEgPSB7XG4gIGFjY291bnRJZDogSm9pLnN0cmluZygpLnJlcXVpcmVkKCksXG4gIGNyZWF0ZWRBdDogSm9pLnN0cmluZygpXG4gICAgLmlzb0RhdGUoKVxuICAgIC5yZXF1aXJlZCgpLFxuICBpZDogSm9pLnN0cmluZygpXG4gICAgLmd1aWQoKVxuICAgIC5kZWZhdWx0KCgpID0+IHV1aWQudjQoKSwgJ3V1aWQgdjQnKSxcbiAgdXBkYXRlZEF0OiBKb2kuc3RyaW5nKCkuaXNvRGF0ZSgpLFxufTtcblxuZXhwb3J0IHR5cGUgU3VwcG9ydGVkTGFuZ3VhZ2VUeXBlID1cbiAgfCAnemgnXG4gIHwgJ3poLUhhbnQnXG4gIHwgJ2VuJ1xuICB8ICdmcidcbiAgfCAnZGUnXG4gIHwgJ2l0J1xuICB8ICdqYSdcbiAgfCAna28nXG4gIHwgJ3B0J1xuICB8ICdlcyc7XG5cbmV4cG9ydCBjb25zdCBTdXBwb3J0ZWRMYW5ndWFnZVNjaGVtYSA9IEpvaS5zdHJpbmcoKS52YWxpZChbXG4gICd6aCcsXG4gICd6aC1IYW50JyxcbiAgJ2VuJyxcbiAgJ2ZyJyxcbiAgJ2RlJyxcbiAgJ2l0JyxcbiAgJ2phJyxcbiAgJ2tvJyxcbiAgJ3B0JyxcbiAgJ2VzJyxcbl0pO1xuXG50eXBlIFRleHRTcGFuVHlwZSA9IHtcbiAgYmVnaW5PZmZzZXQ6IG51bWJlcixcbiAgY29udGVudDogc3RyaW5nLFxufTtcblxuZXhwb3J0IGNvbnN0IFRleHRTcGFuU2NoZW1hID0gSm9pLm9iamVjdCh7XG4gIGJlZ2luT2Zmc2V0OiBKb2kubnVtYmVyKClcbiAgICAubWluKC0xKVxuICAgIC5yZXF1aXJlZCgpLFxuICBjb250ZW50OiBKb2kuc3RyaW5nKCkucmVxdWlyZWQoKSxcbn0pLnVua25vd24oKTtcblxuZXhwb3J0IHR5cGUgU2VudGltZW50VHlwZSA9IHtcbiAgbWFnbml0dWRlOiBudW1iZXIsXG4gIHNjb3JlOiBudW1iZXIsXG59O1xuXG5leHBvcnQgY29uc3QgU2VudGltZW50U2NoZW1hID0gSm9pLm9iamVjdCh7XG4gIG1hZ25pdHVkZTogSm9pLm51bWJlcigpXG4gICAgLm1pbigwKVxuICAgIC5yZXF1aXJlZCgpLFxuICBzY29yZTogSm9pLm51bWJlcigpXG4gICAgLm1pbigtMSlcbiAgICAubWF4KDEpXG4gICAgLnJlcXVpcmVkKCksXG59KS51bmtub3duKCk7XG5cbmV4cG9ydCB0eXBlIENhdGVnb3J5Q29uZmlkZW5jZVR5cGUgPSB7XG4gIGNhdGVnb3J5TmFtZTogc3RyaW5nLFxuICBjb25maWRlbmNlOiBudW1iZXIsXG59O1xuXG5leHBvcnQgY29uc3QgQ2F0ZWdvcnlTY2hlbWEgPSBKb2kub2JqZWN0KHtcbiAgY2F0ZWdvcnlOYW1lOiBKb2kuc3RyaW5nKCkucmVxdWlyZWQoKSxcbiAgY29uZmlkZW5jZTogSm9pLm51bWJlcigpXG4gICAgLm1pbigwKVxuICAgIC5tYXgoMSlcbiAgICAucmVxdWlyZWQoKSxcbn0pLnVua25vd24oKTtcblxuZXhwb3J0IHR5cGUgU2VudGVuY2VUeXBlID0ge1xuICBzZW50aW1lbnQ6IFNlbnRpbWVudFR5cGUsXG4gIHRleHQ6IFRleHRTcGFuVHlwZSxcbn07XG5cbmV4cG9ydCBjb25zdCBTZW50ZW5jZVNjaGVtYSA9IEpvaS5vYmplY3Qoe1xuICBzZW50aW1lbnQ6IFNlbnRpbWVudFNjaGVtYS5yZXF1aXJlZCgpLFxuICB0ZXh0OiBUZXh0U3BhblNjaGVtYS5yZXF1aXJlZCgpLFxufSkudW5rbm93bigpO1xuXG5leHBvcnQgdHlwZSBTZW50aW1lbnRBbmFseXNpc1Jlc3BvbnNlVHlwZSA9IHt8XG4gIGRvY3VtZW50U2VudGltZW50OiBTZW50aW1lbnRUeXBlLFxuICBsYW5ndWFnZTogU3VwcG9ydGVkTGFuZ3VhZ2VUeXBlLFxuICBzZW50ZW5jZXM6IFNlbnRlbmNlVHlwZVtdLFxufH07XG5cbmV4cG9ydCBjb25zdCBTZW50aW1lbnRBbmFseXNpc1Jlc3BvbnNlU2NoZW1hID0gSm9pLm9iamVjdCh7XG4gIGRvY3VtZW50U2VudGltZW50OiBTZW50aW1lbnRTY2hlbWEucmVxdWlyZWQoKSxcbiAgbGFuZ3VhZ2U6IFN1cHBvcnRlZExhbmd1YWdlU2NoZW1hLnJlcXVpcmVkKCksXG4gIHNlbnRlbmNlczogSm9pLmFycmF5KClcbiAgICAuaXRlbXMoU2VudGVuY2VTY2hlbWEpXG4gICAgLmRlZmF1bHQoKCkgPT4gW10sICdEbyBub3QgYWxsb3cgdW5kZWZpbmVkIG9yIG51bGwgdG8gY29tZSBvdXQgb2YgdGhlIERCJyksXG59KS51bmtub3duKCk7XG5cbmV4cG9ydCB0eXBlIEZlZWRiYWNrVHlwZSA9ICdlbWFpbCcgfCAndHdpdHRlcic7XG5cbmV4cG9ydCB0eXBlIFR3aXR0ZXJVc2VyVHlwZSA9IHt8XG4gIGF2YXRhclVybDogc3RyaW5nLFxuICBpZDogc3RyaW5nLFxuICB1c2VybmFtZTogc3RyaW5nLFxufH07XG5cbmV4cG9ydCBjb25zdCBUd2l0dGVyVXNlclNjaGVtYSA9IEpvaS5vYmplY3Qoe1xuICBhdmF0YXJVcmw6IEpvaS5zdHJpbmcoKVxuICAgIC51cmkoKVxuICAgIC5yZXF1aXJlZCgpLFxuICBpZDogSm9pLnN0cmluZygpLnJlcXVpcmVkKCksXG4gIHVzZXJuYW1lOiBKb2kuc3RyaW5nKCkucmVxdWlyZWQoKSxcbn0pLnVua25vd24oKTtcblxuZXhwb3J0IHR5cGUgRW1haWxVc2VyVHlwZSA9IHt8XG4gIGlkOiBzdHJpbmcsXG58fTtcblxuZXhwb3J0IGNvbnN0IEVtYWlsVXNlclNjaGVtYSA9IEpvaS5vYmplY3Qoe1xuICBpZDogSm9pLnN0cmluZygpXG4gICAgLmVtYWlsKClcbiAgICAucmVxdWlyZWQoKSxcbn0pLnVua25vd24oKTtcblxuZXhwb3J0IHR5cGUgVXNlclR5cGUgPSBFbWFpbFVzZXJUeXBlIHwgVHdpdHRlclVzZXJUeXBlO1xuXG5leHBvcnQgY29uc3QgVXNlclNjaGVtYSA9IEpvaS5jb21waWxlKFtUd2l0dGVyVXNlclNjaGVtYSwgRW1haWxVc2VyU2NoZW1hXSk7XG5cbmV4cG9ydCB0eXBlIEZlZWRiYWNrU2VudGltZW50QW5kQ2F0ZWdvcml6YXRpb25UeXBlID0ge3xcbiAgY29udGVudFNlbnRpbWVudDogU2VudGltZW50VHlwZSxcbiAgZG9jdW1lbnRDYXRlZ29yaXphdGlvbjogQ2F0ZWdvcnlDb25maWRlbmNlVHlwZVtdLFxuICBzZW50ZW5jZXM6IEFycmF5PHtcbiAgICBjYXRlZ29yaXphdGlvbjogQ2F0ZWdvcnlDb25maWRlbmNlVHlwZVtdLFxuICAgIC4uLlNlbnRlbmNlVHlwZSxcbiAgfT4sXG4gIHRvcERvY3VtZW50Q2F0ZWdvcmllczogQXJyYXk8c3RyaW5nPixcbiAgdG9wU2VudGVuY2VDYXRlZ29yaWVzOiBBcnJheTxzdHJpbmc+LFxufH07XG5cbmV4cG9ydCB0eXBlIEZlZWRiYWNrQW5hbHlzaXNVbnNhdmVkVHlwZSA9IHt8XG4gIC4uLkZlZWRiYWNrU2VudGltZW50QW5kQ2F0ZWdvcml6YXRpb25UeXBlLFxuICBhY2NvdW50SWQ6IHN0cmluZyxcbiAgZmVlZGJhY2tJZDogc3RyaW5nLFxuICBmZWVkYmFja1R5cGU6IEZlZWRiYWNrVHlwZSxcbiAgdXNlcjogVXNlclR5cGUsXG4gIHVzZXJJZDogc3RyaW5nLFxufH07XG5cbmV4cG9ydCB0eXBlIEZlZWRiYWNrQW5hbHlzaXNUeXBlID0ge1xuICAuLi5GZWVkYmFja0FuYWx5c2lzVW5zYXZlZFR5cGUsXG4gIC4uLk1vZGVsU2F2ZWRGaWVsZHNUeXBlLFxufTtcblxuZXhwb3J0IGNvbnN0IEZlZWRiYWNrQW5hbHlzaXNTY2hlbWEgPSBKb2kub2JqZWN0KHtcbiAgLi4uTW9kZWxTYXZlZEZpZWxkc1NjaGVtYSxcbiAgY29udGVudFNlbnRpbWVudDogU2VudGltZW50U2NoZW1hLnJlcXVpcmVkKCksXG4gIGRvY3VtZW50Q2F0ZWdvcml6YXRpb246IEpvaS5hcnJheSgpXG4gICAgLml0ZW1zKENhdGVnb3J5U2NoZW1hKVxuICAgIC5kZWZhdWx0KCgpID0+IFtdLCAnRG8gbm90IGFsbG93IHVuZGVmaW5lZCBvciBudWxsIHRvIGNvbWUgb3V0IG9mIHRoZSBEQicpLFxuICBmZWVkYmFja0lkOiBKb2kuc3RyaW5nKClcbiAgICAuZ3VpZCgpXG4gICAgLmRlZmF1bHQoKCkgPT4gdXVpZC52NCgpLCAndXVpZCB2NCcpLFxuICBmZWVkYmFja1R5cGU6IEpvaS5zdHJpbmcoKVxuICAgIC5hbGxvdyhbJ2VtYWlsJywgJ3R3aXR0ZXInXSlcbiAgICAucmVxdWlyZWQoKSxcbiAgc2VudGVuY2VzOiBKb2kuYXJyYXkoKVxuICAgIC5pdGVtcyhcbiAgICAgIFNlbnRlbmNlU2NoZW1hLmtleXMoe1xuICAgICAgICBjYXRlZ29yaXphdGlvbjogSm9pLmFycmF5KClcbiAgICAgICAgICAuaXRlbXMoQ2F0ZWdvcnlTY2hlbWEpXG4gICAgICAgICAgLmRlZmF1bHQoXG4gICAgICAgICAgICAoKSA9PiBbXSxcbiAgICAgICAgICAgICdEbyBub3QgYWxsb3cgdW5kZWZpbmVkIG9yIG51bGwgdG8gY29tZSBvdXQgb2YgdGhlIERCJ1xuICAgICAgICAgICksXG4gICAgICB9KS5yZXF1aXJlZCgpXG4gICAgKVxuICAgIC5kZWZhdWx0KCgpID0+IFtdLCAnRG8gbm90IGFsbG93IHVuZGVmaW5lZCBvciBudWxsIHRvIGNvbWUgb3V0IG9mIHRoZSBEQicpLFxuICB0b3BEb2N1bWVudENhdGVnb3JpZXM6IEpvaS5hcnJheSgpXG4gICAgLml0ZW1zKEpvaS5zdHJpbmcoKSlcbiAgICAuZGVmYXVsdCgoKSA9PiBbXSwgJ0RvIG5vdCBhbGxvdyB1bmRlZmluZWQgb3IgbnVsbCB0byBjb21lIG91dCBvZiB0aGUgREInKSxcbiAgdG9wU2VudGVuY2VDYXRlZ29yaWVzOiBKb2kuYXJyYXkoKVxuICAgIC5pdGVtcyhKb2kuc3RyaW5nKCkpXG4gICAgLmRlZmF1bHQoKCkgPT4gW10sICdEbyBub3QgYWxsb3cgdW5kZWZpbmVkIG9yIG51bGwgdG8gY29tZSBvdXQgb2YgdGhlIERCJyksXG4gIHVzZXI6IFVzZXJTY2hlbWEsXG4gIHVzZXJJZDogSm9pLnN0cmluZygpLnJlcXVpcmVkKCksXG59KVxuICAudW5rbm93bigpXG4gIC5yZXF1aXJlZCgpO1xuXG5leHBvcnQgdHlwZSBXYXRzb25DbGFzc2lmeVJlc3BvbnNlVHlwZSA9IHtcbiAgY2xhc3NlczogQXJyYXk8eyBjbGFzc19uYW1lOiBzdHJpbmcsIGNvbmZpZGVuY2U6IG51bWJlciB9PixcbiAgY2xhc3NpZmllcl9pZDogc3RyaW5nLFxuICB0ZXh0OiBzdHJpbmcsXG4gIHRvcF9jbGFzczogc3RyaW5nLFxuICB1cmw6IHN0cmluZyxcbn07XG5cbmV4cG9ydCBjb25zdCBXYXRzb25DbGFzc2lmeVJlc3BvbnNlU2NoZW1hID0gSm9pLm9iamVjdCh7XG4gIGNsYXNzZXM6IEpvaS5hcnJheSgpXG4gICAgLml0ZW1zKFxuICAgICAgSm9pLm9iamVjdCh7XG4gICAgICAgIGNsYXNzX25hbWU6IEpvaS5zdHJpbmcoKS5yZXF1aXJlZCgpLFxuICAgICAgICBjb25maWRlbmNlOiBKb2kubnVtYmVyKClcbiAgICAgICAgICAubWluKDApXG4gICAgICAgICAgLm1heCgxKVxuICAgICAgICAgIC5yZXF1aXJlZCgpLFxuICAgICAgfSkudW5rbm93bigpXG4gICAgKVxuICAgIC5kZWZhdWx0KCgpID0+IFtdLCAnRG8gbm90IGFsbG93IHVuZGVmaW5lZCBvciBudWxsIHRvIGNvbWUgb3V0IG9mIHRoZSBEQicpLFxuICBjbGFzc2lmaWVyX2lkOiBKb2kuc3RyaW5nKCkucmVxdWlyZWQoKSxcbiAgdGV4dDogSm9pLnN0cmluZygpLnJlcXVpcmVkKCksXG4gIHRvcF9jbGFzczogSm9pLnN0cmluZygpLnJlcXVpcmVkKCksXG4gIHVybDogSm9pLnN0cmluZygpXG4gICAgLnVyaSh7IGFsbG93UmVsYXRpdmU6IHRydWUgfSlcbiAgICAucmVxdWlyZWQoKSxcbn0pO1xuXG5leHBvcnQgdHlwZSBFbWFpbEZlZWRiYWNrUG9zdEJvZHlUeXBlID0ge3xcbiAgY29udGVudDogc3RyaW5nLFxuICBlbWFpbFNlbnREYXRlOiBzdHJpbmcsXG4gIGZyb206IHN0cmluZyxcbiAgc3ViamVjdDogc3RyaW5nLFxuICB0bzogc3RyaW5nLFxufH07XG5cbmV4cG9ydCBjb25zdCBFbWFpbEZlZWRiYWNrUG9zdEJvZHlTY2hlbWEgPSBKb2kub2JqZWN0KHtcbiAgY29udGVudDogSm9pLnN0cmluZygpLnJlcXVpcmVkKCksXG4gIGVtYWlsU2VudERhdGU6IEpvaS5zdHJpbmcoKVxuICAgIC5pc29EYXRlKClcbiAgICAucmVxdWlyZWQoKSxcbiAgZnJvbTogSm9pLnN0cmluZygpXG4gICAgLmVtYWlsKClcbiAgICAucmVxdWlyZWQoKSxcbiAgc3ViamVjdDogSm9pLnN0cmluZygpLnJlcXVpcmVkKCksXG4gIHRvOiBKb2kuc3RyaW5nKClcbiAgICAuZW1haWwoKVxuICAgIC5yZXF1aXJlZCgpLFxufSlcbiAgLnVua25vd24oKVxuICAucmVxdWlyZWQoKTtcblxuZXhwb3J0IHR5cGUgRW1haWxGZWVkYmFja1Vuc2F2ZWRUeXBlID0ge3xcbiAgLi4uRW1haWxGZWVkYmFja1Bvc3RCb2R5VHlwZSxcbiAgYWNjb3VudElkOiBzdHJpbmcsXG58fTtcblxuZXhwb3J0IHR5cGUgRW1haWxGZWVkYmFja1R5cGUgPSB7XG4gIC4uLkVtYWlsRmVlZGJhY2tVbnNhdmVkVHlwZSxcbiAgLi4uTW9kZWxTYXZlZEZpZWxkc1R5cGUsXG59O1xuXG5leHBvcnQgY29uc3QgRW1haWxGZWVkYmFja1NjaGVtYSA9IEVtYWlsRmVlZGJhY2tQb3N0Qm9keVNjaGVtYS5rZXlzKHtcbiAgLi4uTW9kZWxTYXZlZEZpZWxkc1NjaGVtYSxcbn0pXG4gIC51bmtub3duKClcbiAgLnJlcXVpcmVkKCk7XG5cbmV4cG9ydCB0eXBlIEVtYWlsRmVlZGJhY2tXaXRoTWF5YmVBbmFseXNpc1R5cGUgPSB7XG4gIC4uLkVtYWlsRmVlZGJhY2tUeXBlLFxuICBhbmFseXNpczogP0ZlZWRiYWNrQW5hbHlzaXNUeXBlLFxufTtcblxuZXhwb3J0IGNvbnN0IEVtYWlsRmVlZGJhY2tXaXRoTWF5YmVBbmFseXNpc1NjaGVtYSA9IEVtYWlsRmVlZGJhY2tTY2hlbWEua2V5cyh7XG4gIGFuYWx5c2lzOiBGZWVkYmFja0FuYWx5c2lzU2NoZW1hLFxufSlcbiAgLnVua25vd24oKVxuICAucmVxdWlyZWQoKTtcblxuZXhwb3J0IHR5cGUgVHdpdHRlckZlZWRiYWNrVW5zYXZlZFR5cGUgPSB7fFxuICBhY2NvdW50SWQ6IHN0cmluZyxcbiAgc3RhdHVzSWQ6IHN0cmluZyxcbiAgdXNlcjogVHdpdHRlclVzZXJUeXBlLFxufH07XG5cbmV4cG9ydCB0eXBlIFR3aXR0ZXJGZWVkYmFja1R5cGUgPSB7XG4gIC4uLlR3aXR0ZXJGZWVkYmFja1Vuc2F2ZWRUeXBlLFxuICAuLi5Nb2RlbFNhdmVkRmllbGRzVHlwZSxcbn07XG5cbmV4cG9ydCBjb25zdCBUd2l0dGVyRmVlZGJhY2tTY2hlbWEgPSBKb2kub2JqZWN0KHtcbiAgLi4uTW9kZWxTYXZlZEZpZWxkc1NjaGVtYSxcbiAgc3RhdHVzSWQ6IEpvaS5zdHJpbmcoKS5yZXF1aXJlZCgpLFxuICB1c2VyOiBUd2l0dGVyVXNlclNjaGVtYS5yZXF1aXJlZCgpLFxufSlcbiAgLnVua25vd24oKVxuICAucmVxdWlyZWQoKTtcblxuZXhwb3J0IHR5cGUgVHdpdHRlckZlZWRiYWNrV2l0aE1heWJlQW5hbHlzaXNUeXBlID0ge1xuICAuLi5Ud2l0dGVyRmVlZGJhY2tUeXBlLFxuICBhbmFseXNpczogP0ZlZWRiYWNrQW5hbHlzaXNUeXBlLFxufTtcblxuZXhwb3J0IGNvbnN0IFR3aXR0ZXJGZWVkYmFja1dpdGhNYXliZUFuYWx5c2lzU2NoZW1hID0gVHdpdHRlckZlZWRiYWNrU2NoZW1hLmtleXMoXG4gIHtcbiAgICBhbmFseXNpczogRmVlZGJhY2tBbmFseXNpc1NjaGVtYSxcbiAgfVxuKVxuICAudW5rbm93bigpXG4gIC5yZXF1aXJlZCgpO1xuXG5leHBvcnQgdHlwZSBBY2NvdW50VGllclR5cGUgPSAnbm90QXBwcm92ZWQnIHwgJ2ZyZWUnO1xuXG5leHBvcnQgdHlwZSBBY2NvdW50U2V0dGluZ1Bvc3RCb2R5VHlwZSA9IHt8XG4gIHR3aXR0ZXJTZWFyY2hlczogc3RyaW5nW10sXG58fTtcblxuZXhwb3J0IGNvbnN0IEFjY291bnRTZXR0aW5nUG9zdEJvZHlTY2hlbWEgPSBKb2kub2JqZWN0KHtcbiAgdHdpdHRlclNlYXJjaGVzOiBKb2kuYXJyYXkoKVxuICAgIC5pdGVtcyhKb2kuc3RyaW5nKCkpXG4gICAgLmRlZmF1bHQoKCkgPT4gW10sICdEbyBub3QgYWxsb3cgdW5kZWZpbmVkIG9yIG51bGwgdG8gY29tZSBvdXQgb2YgdGhlIERCJyksXG59KVxuICAudW5rbm93bigpXG4gIC5yZXF1aXJlZCgpO1xuXG5leHBvcnQgdHlwZSBBY2NvdW50U2V0dGluZ1Vuc2F2ZWRUeXBlID0ge3xcbiAgLi4uQWNjb3VudFNldHRpbmdQb3N0Qm9keVR5cGUsXG4gIGFjY291bnRJZDogc3RyaW5nLFxuICBmZWVkYmFja1VzYWdlQnlEYXRlOiB7XG4gICAgW2tleTogWWVhck1vbnRoQnVja2V0VHlwZV06IG51bWJlcixcbiAgfSxcbiAgdGllcjogQWNjb3VudFRpZXJUeXBlLFxufH07XG5cbmV4cG9ydCB0eXBlIEFjY291bnRTZXR0aW5nVHlwZSA9IHtcbiAgLi4uQWNjb3VudFNldHRpbmdVbnNhdmVkVHlwZSxcbiAgLi4uTW9kZWxTYXZlZEZpZWxkc1R5cGUsXG59O1xuXG5leHBvcnQgY29uc3QgQWNjb3VudFNldHRpbmdTY2hlbWEgPSBKb2kub2JqZWN0KHtcbiAgLi4uTW9kZWxTYXZlZEZpZWxkc1NjaGVtYSxcbiAgZmVlZGJhY2tVc2FnZUJ5RGF0ZTogSm9pLm9iamVjdCgpXG4gICAgLnBhdHRlcm4oXG4gICAgICBZZWFyTW9udGhCdWNrZXRSZWdleCxcbiAgICAgIEpvaS5udW1iZXIoKVxuICAgICAgICAubWluKDApXG4gICAgICAgIC5yZXF1aXJlZCgpXG4gICAgKVxuICAgIC5yZXF1aXJlZCgpLFxuICBpZDogSm9pLnN0cmluZygpLnJlcXVpcmVkKCksXG4gIHRpZXI6IEpvaS5zdHJpbmcoKVxuICAgIC52YWxpZChbJ25vdEFwcHJvdmVkJywgJ2ZyZWUnXSlcbiAgICAucmVxdWlyZWQoKSxcbiAgdHdpdHRlclNlYXJjaGVzOiBKb2kuYXJyYXkoKVxuICAgIC5pdGVtcyhKb2kuc3RyaW5nKCkpXG4gICAgLmRlZmF1bHQoKCkgPT4gW10sICdEbyBub3QgYWxsb3cgdW5kZWZpbmVkIG9yIG51bGwgdG8gY29tZSBvdXQgb2YgdGhlIERCJyksXG59KVxuICAudW5rbm93bigpXG4gIC5yZXF1aXJlZCgpO1xuIl19
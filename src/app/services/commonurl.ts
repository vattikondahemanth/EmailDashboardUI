import { environment } from '../../environments/environment';

export const CommonURL = {
    useremail           : environment.baseURL + 'api/actionable/useremails',
    emailCount          : environment.baseURL + 'api/critical/emailcount',
    emailResponse       : environment.baseURL + 'api/critical/emailresponse',
    escalatedKeywords   : environment.baseURL + 'api/escalated/keywords',
    actionEmailCount    : environment.baseURL + 'api/actionable/count',
    criticalEmailCount  : environment.baseURL + 'api/critical/emailcount',
    escalatedEmailCount : environment.baseURL + 'api/escalated/count',
    insightsUserEmail   : environment.baseURL + 'api/insights/user_emails',
    insightsChaserEmail : environment.baseURL + 'api/insights/chaser_emails',
    insightsEmailByUser : environment.baseURL + 'api/insights/emails_by_user',
    insightsVolumeDay   : environment.baseURL + 'api/insights/volume_by_day',
    insightsTopSenders  : environment.baseURL + 'api/insights/top_external_senders',
}
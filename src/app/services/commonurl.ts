import { environment } from '../../environments/environment';

export const CommonURL = {
    useremail : environment.baseURL + 'api/actionable/useremails',
    emailCount : environment.baseURL + 'api/critical/emailcount',
    emailResponse : environment.baseURL + 'api/critical/emailresponse',
    escalatedKeywords : environment.baseURL + 'api/escalated/keywords',
}
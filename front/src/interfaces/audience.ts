import { Audience } from "../types/audience";

export interface AudienceListener {
    onAudienceChange (audience: Audience);
}
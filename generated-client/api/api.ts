export * from './authentication.service';
import { AuthenticationApiService } from './authentication.service';
export * from './members.service';
import { MembersApiService } from './members.service';
export * from './ticket-types.service';
import { TicketTypesApiService } from './ticket-types.service';
export const APIS = [AuthenticationApiService, MembersApiService, TicketTypesApiService];

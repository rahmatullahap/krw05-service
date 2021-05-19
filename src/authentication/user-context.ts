import { HakAkses } from '../resolvers/model';

/**
 * Data structure used on access token & graphql user context
 * mainly to identify session statelessly
 *
 * @export
 * @interface UserContext
 */
export interface UserContext {
  userid: string; // account username
  nama: string;
  hakakses: HakAkses;
}

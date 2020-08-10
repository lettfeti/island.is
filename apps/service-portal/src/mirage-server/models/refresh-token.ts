import { v4 as uuidv4 } from 'uuid';
import { format, isPast, addSeconds } from 'date-fns';

export class RefreshToken {
  exp: string
  nationalId: string
  payload: string

  constructor(nationalId: string = '') {
    if(nationalId === '') return this
    this.nationalId = nationalId
    this.payload = uuidv4()
    this.exp = format(addSeconds(new Date(), 30), 'T')
  }

  public isExpired(): Boolean {
    return isPast(new Date(this.exp))
  }

  public getExpiryUTCString(): string {
    return new Date(this.exp).toUTCString()
  }
}

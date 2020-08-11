import { v4 as uuidv4 } from 'uuid';
import { format, isPast, addSeconds } from 'date-fns';

export class RefreshToken {
  exp: string
  nationalId: string
  subjectNationalId: string
  payload: string

  constructor(nationalId: string = '', subNationalId: string = '') {
    if(nationalId === '') return this
    this.nationalId = nationalId
    this.subjectNationalId = subNationalId
    this.payload = uuidv4()
    this.exp = format(addSeconds(new Date(), 5), 'T')
  }

  public isExpired(): Boolean {
    return isPast((new Date(+this.exp)))
  }

  public getExpiryUTCString(): string {
    return new Date(this.exp).toUTCString()
  }

}

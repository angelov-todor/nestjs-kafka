import { Injectable } from '@nestjs/common';
import { NotaryRecord } from '../notary-record';

interface RecordInfo {
  nonce: number;
  timestamp: number;
}

@Injectable()
export class NotaryService {
  private nonce = 1;
  private notary: Map<string, RecordInfo> = new Map();

  public newRecord(event: { hash: string }): NotaryRecord {
    const record = { nonce: ++this.nonce, timestamp: new Date().valueOf() };
    this.notary.set(event.hash, record);
    return record;
  }

  public getRecord(event: { hash: string }): NotaryRecord {
    return this.notary.get(event.hash);
  }
}

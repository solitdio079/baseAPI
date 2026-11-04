#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/4acb443bcab0d109975522cf246faca915d25a5a047fe259c9b2e7c0d685ed9c/contract';
import endContract from '../../snapshots/4acb443bcab0d109975522cf246faca915d25a5a047fe259c9b2e7c0d685ed9c/contract.json' with { type: 'json' };
import type { Contract as Start } from '../../snapshots/b1d34b9478d0ba951556b5e3e89af1907e4c85eb06fd3a9e5988a9130a40abf9/contract';
import startContract from '../../snapshots/b1d34b9478d0ba951556b5e3e89af1907e4c85eb06fd3a9e5988a9130a40abf9/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.addColumn({
        schema: 'public',
        table: 'User',
        column: col('phone', 'text', { codecRef: { codecId: 'pg/text@1' } }),
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);

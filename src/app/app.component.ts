import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatAnchor } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { WalletStore } from '@heavy-duty/wallet-adapter';
import { HdWalletMultiButtonComponent } from '@heavy-duty/wallet-adapter-material';
import { computedAsync } from 'ngxtension/computed-async';
import { ShyftApiService } from './shyft-api.service';

@Component({
  standalone: true,
  imports: [RouterModule, HdWalletMultiButtonComponent],
  selector: 'org2-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  private readonly _shyftApiService = inject(ShyftApiService);
  private readonly _walletStore = inject(WalletStore);
  private readonly _publicKey = toSignal(this._walletStore.publicKey$);

  readonly account = computedAsync(
    () => this._shyftApiService.getAccount(this._publicKey()?.toBase58()),
    { requireSync: true },
  )
}

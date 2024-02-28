import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { map, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ShyftApiService {
	private readonly _httpClient = inject(HttpClient);
	private readonly _headers = { 'x-api-key': 'NvOwJmyEUl-tOSLH' };
	private readonly _mint = '0xdac17f958d2ee523a2206206994597c13d831ec7';

	getAccount(publicKey: string | undefined | null){
		if (!publicKey){
			return of(null);
		}

		const url = new URL('https://api.shyft.to/sol/vl/wallet/token_balance');

		url.searchParams.append('network', 'mainnet-beta');
		url.searchParams.append('wallet', publicKey);
		url.searchParams.append('token', this._mint);

		return this._httpClient.get<{
			result: { balance: number; info: { image: string } };
		}>(url.toString(),
		 { headers: this._headers }
		)
		.pipe(map(({ result }) => result ));
	}
}

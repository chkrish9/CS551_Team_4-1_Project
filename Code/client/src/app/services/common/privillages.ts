import { Injectable } from '@angular/core';
@Injectable({
    providedIn: 'root'
})
export class Privillages {
    getPrivillages() {
        return [
            {"name":"usergroup","set":false},
            {"name":"user","set":false},
            {"name":"home","set":false},
            {"name":"machine","set":false},
            {"name":"reasons","set":false},
            {"name":"line","set":false},
            {"name":"area","set":false},
            {"name":"machinegroup","set":false},
            {"name":"machine","set":false},
        ];
    }
}
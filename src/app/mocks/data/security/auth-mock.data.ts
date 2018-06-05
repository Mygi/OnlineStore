import { Auth } from '../../../modules/security/models/auth-user.model';

export class AuthMock {
    public authUsers: Auth[] = [];

    /**
     * setup AuthUsers this is a convenience for me - but will it match a service?
     */
    constructor() {
        const s = new Auth('sarah@thefinderskeepers.com', 'blahbl@h!', 1 );
        // tslint:disable-next-line:max-line-length
        s.token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwidXNlcm5hbWUiOiJzYXJhaEB0aGVmaW5kZXJza2VlcGVycy5jb20iLCJpYXQiOjE1MjM5ODU0NDEsInJvbGUiOiJhZG1pbiIsImV4cCI6MTUyMzk4NTQ0MX0.IosYcxm-hoh9oQTIZf-t51o6l3N4yxca9FuQ3HnYLQs';
        this.authUsers.push( s );


        this.authUsers.push(new Auth('andrew.glenn@southgatehouse.com.au', 'M3l133@D35u', 2,
        // tslint:disable-next-line:max-line-length
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwidXNlcm5hbWUiOiJhbmRyZXcuZ2xlbm5Ac291dGhnYXRlaG91c2UuY29tLmF1IiwiaWF0IjoxNTIzOTg1NDQxLCJyb2xlIjoiYWRtaW4iLCJleHAiOjE3MjM5ODU0NDF9.jVYwc7gAbiuOZ_Emu_gnLmDxeSVUfHmQHF_ap7YVcy4'
        ));

        this.authUsers.push(new Auth('nik@thefinderskeepers.com', 'n3k05p@c3', 3,
        // tslint:disable-next-line:max-line-length
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwidXNlcm5hbWUiOiJuaWtAdGhlZmluZGVyc2tlZXBlcnMuY29tIiwiaWF0IjoxNTIzOTg1NDQxLCJyb2xlIjoiYWRtaW4iLCJleHAiOjE1MjM5ODU0NDF9.alN10IMICnwGt28JL8qWvncnDpv1PL3gv8ShgEqID9o'
        ));

        this.authUsers.push(new Auth('luke@thefinderskeepers.com', '13xp3ct8or', 4,
        // tslint:disable-next-line:max-line-length
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwidXNlcm5hbWUiOiJsdWtlQHRoZWZpbmRlcnNrZWVwZXJzLmNvbSIsImlhdCI6MTUyMzk4NTQ0MSwicm9sZSI6ImFkbWluIiwiZXhwIjoxNTIzOTg1NDQxfQ.dta1GZDA9dTvynCXh62SXlet1vBWP8ocIVECUJJAXwk'
        ));

        this.authUsers.push(new Auth('test@thefinderskeepers.com', 't3stm3:)', 5,
        // tslint:disable-next-line:max-line-length
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwidXNlcm5hbWUiOiJ0ZXN0QHRoZWZpbmRlcnNrZWVwZXJzLmNvbSIsImlhdCI6MTUyMzk4NTQ0MSwicm9sZSI6InNlbGxlciIsImV4cCI6MTUyMzk4NTQ0MX0.ICBBT2k2tg1DeEEx9svu9suhsXWWj1DuANlq_IkITWo'
        ));
    }

}

import jwt from 'jsonwebtoken';
export default class Auth {
    private static ACCESS_TOKEN_SECRET = 'dcbeasdfSF976#$).lsdfvfdPOCD9&*c';
    private static obj: Auth;
    private constructor() { }
    public static instance() {
        if (!this.obj) {
            this.obj = new Auth();
        }
        return this.obj;
    }
    public authInterceptor(req: any, res: any, next: any) {
        const path = req.path;
        console.log('Intercepting Route... ' + path);
        if (path.split('/').includes('s')) {
            const authHeader = req.headers.authorization;
            if (authHeader) {
                const token = authHeader.split(' ')[1];
                jwt.verify(token, Auth.ACCESS_TOKEN_SECRET, (err: any, user: any) => {
                    if (err) {
                        res.sendStatus(401);
                        return;
                    }
                    next();
                });
            } else {
                res.sendStatus(401);
                return;
            }
        } else {
            next();
        }
    }
    public generateToken(username: string): string {
        return jwt.sign({ username: username }, Auth.ACCESS_TOKEN_SECRET);
    }
}
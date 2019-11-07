import Log from "../Log/LogHelp";

const { ccclass, property } = cc._decorator;

/**
 * http请求
 */
@ccclass
export default class HTTP extends cc.Component {
    public static readonly HTTP_TOKEN_HEAD: string = "Bearer ";
    public static readonly HTTP_HEAD: string = "token";

    public static readonly SUCCESS: number = 0; //success

    // SUCCESS(0, "success"),
    // NOT_FOUND_404(404, "path not exist"),
    // ERROR(1, "Unknown error"),
    // AUTH_ERROR(403, "Authorization fail!"),
    // EXCEPTION(-1, "exception"),
    // RUNTIMEEXCEPTION(-2, "runtime exception"),
    // EMAIL_ERROR(103, "email send fail"),
    // JSON_PARSE_ERROR(104, "json parse error"),
    // GET_BET_SIGN_ERR(105, "get sign error"),
    // PARAM_ERROR(106, "param error"),
    // CRASHBET_ERROR(107, "crash bet time error"),
    // CRASHID_ERROR(108, "get crashId error"),
    // FUNMO_REWARD(109, "funMo reward error"),
    // EMAIL_TOKEN_ERR(110, "email token error");

    private static __instance: HTTP;
    public static get Instance() {
        if (null == this.__instance) {
            this.__instance = new HTTP();
        }
        return this.__instance;
    }

    public Initial() { }

    start() { }

    public httpGet(
        url: string,
        reqData: object,
        token: string,
        callback: Function
    ) {
        if (reqData != null) {
            url += "?";
            for (var item in reqData) {
                url += item + "=" + reqData[item] + "&";
            }
        }

        // Log.log(url);

        var xhr = cc.loader.getXMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (
                xhr.readyState === 4 &&
                (xhr.status >= 200 && xhr.status < 300)
            ) {
                var respone = xhr.responseText;
                callback(respone);
            }
        };
        xhr.open("GET", url, true);
        if (cc.sys.isNative) {
            xhr.setRequestHeader("Accept-Encoding", "gzip,deflate");
        }

        if (token != null || token != "") {
            xhr.setRequestHeader(HTTP.HTTP_HEAD, token);
        }

        // note: In Internet Explorer, the timeout property may be set only after calling the open()
        // method and before calling the send() method.
        xhr.timeout = 30000; // 5 seconds for timeout

        xhr.send();
    }

    public httpPost(
        url: string,
        reqData: object,
        token: string,
        callback: Function
    ) {
        //1.拼接请求参数
        // var param = "";
        // for (var item in reqData) {
        //     param += item + "=" + reqData[item] + "&";
        // }

        // Log.log(param);

        //2.发起请求
        var xhr = cc.loader.getXMLHttpRequest();
        xhr.onreadystatechange = function () {
            // cc.log(
            //     "xhr.readyState=" +
            //         xhr.readyState +
            //         "  xhr.status=" +
            //         xhr.status
            // );
            
            if (
                xhr.readyState === 4 &&
                (xhr.status >= 200 && xhr.status < 300)
            ) {
                var respone = xhr.responseText;
                callback(respone);
            } else {
                callback(-1);
            }
        };
        xhr.open("POST", url, true);
        if (cc.sys.isNative) {
            xhr.setRequestHeader("Accept-Encoding", "gzip,deflate");
        }
        xhr.setRequestHeader("Content-Type", "application/json;charset=utf-8");
        if (token != null || token != "") {
            // if (token.indexOf(HTTP.HTTP_TOKEN_HEAD) == -1) {
            //     token = HTTP.HTTP_TOKEN_HEAD + token;
            // }
            xhr.setRequestHeader(HTTP.HTTP_HEAD, token);
        }
        // note: In Internet Explorer, the timeout property may be set only after calling the open()
        // method and before calling the send() method.
        xhr.timeout = 30000; // 5 seconds for timeout

        xhr.send(JSON.stringify(reqData)); //reqData为字符串形式： "key=value"
    }
}

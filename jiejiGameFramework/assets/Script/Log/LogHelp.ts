
/**
 * log管理
 */
export default class LogHelp 
{
    public static OPENLOGFLAG:boolean = true;
    // public static OPENLOGFLAG:boolean = false;

    public static getDateString():string 
    {
        var d = new Date();
        let str:string = d.getHours().toString();
        let timeStr:string = "";
        timeStr += (str.length==1? "0"+str : str) + ":";
        str = d.getMinutes().toString();
        timeStr += (str.length==1? "0"+str : str) + ":";
        str = d.getSeconds().toString();
        timeStr += (str.length==1? "0"+str : str) + ":";
        str = d.getMilliseconds().toString();
        if( str.length==1 ) str = "00"+str;
        if( str.length==2 ) str = "0"+str;
        timeStr += str;
        timeStr = "[" + timeStr + "]";
        return timeStr;
    }

    public static stack(index) 
    {
        var e = new Error();
        var lines = e.stack.split("\n");
        lines.shift();
        var result = [];
        lines.forEach(function (line) 
        {
            line = line.substring(7);
            var lineBreak = line.split(" ");
            if (lineBreak.length<2) 
            {
                result.push(lineBreak[0]);
            } 
            else 
            {
                result.push({[lineBreak[0]] : lineBreak[1]});
            }
        });
    
        var list = [];
        if(index < result.length-1)
        {
            for(var a in result[index])
            {
                list.push(a);
            }
        }
        let str:string = '';
        if(list.length > 0)
        {
            var splitList = list[0].split(".");
             if(splitList.length >= 3)
             {
                 if(splitList[0] !="Function")
                 {
                    str = (splitList[0] + ".ts->" + splitList[1] + ".ts->" + splitList[2] + ": ");
                 }
                 else
                 {
                    str = (splitList[1] + ".ts->" + splitList[2] + ": ");
                 }
            }
            else if(splitList.length >= 2)
            {
                str = (splitList[0] + ".ts->" + splitList[1] + ": ");
            }
            else
            {
                str = ("null -> null : ");
           }
        }
        else
        {
            str = ("null -> null :");
        }
       return '['+str+'] '+"msg: ";
    }

    public static log(msg: string):void
    {
        var backLog = console.log || cc.log || LogHelp.log;
    
        if(LogHelp.OPENLOGFLAG)
        {
            backLog.call(this,"log：%s%s"+cc.js.formatStr.apply(cc,arguments),LogHelp.getDateString(),this.stack(2));
        }
    }

    public static info(msg: string):void 
    {
        var backLog = console.log || cc.log || LogHelp.log;
        if(LogHelp.OPENLOGFLAG)
        {
            backLog.call(this,"info：%c%s%s:"+cc.js.formatStr.apply(cc,arguments),"color:#00CD00;",LogHelp.getDateString(),this.stack(2));
        }
    }
    
    public static warn(msg: string):void
    {
        var backLog = console.log || cc.log || LogHelp.log;
        if(LogHelp.OPENLOGFLAG)
        {
            backLog.call(this,"warn：%c%s%s:"+cc.js.formatStr.apply(cc,arguments),"color:#0000FF;",LogHelp.getDateString(),this.stack(2));
        }
    }
    
    public static err(msg: string)
    {
        var backLog = console.log || cc.log || LogHelp.log;
        if(LogHelp.OPENLOGFLAG)
        {
            backLog.call(this,"error：%c%s%s:"+cc.js.formatStr.apply(cc,arguments),"color:red",LogHelp.getDateString(),this.stack(2));
        }
    }
}

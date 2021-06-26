/*@Author: Maple
* @QQ:766158258
* @versioin: 1.0
* @LastEditTime: 2020-11-23 11:52:19
*/
"ui";
importClass(android.view.View);
importClass(android.content.res.ColorStateList);
importClass(android.graphics.drawable.GradientDrawable);

ui.statusBarColor(colors.TRANSPARENT);

const ScriptName = "模板"
const AllColor = "#000000"
const alpha = 0.6
const Console = "< < 运行日志 > >"
const resources = context.getResources();
// 获取状态栏高度
const resourceId = context.getResources().getIdentifier("status_bar_height", "dimen", "android");
const statusBarHeight = context.getResources().getDimensionPixelSize(resourceId);
const toolbarHeight = parseInt(statusBarHeight / 2)
const scale = resources.getDisplayMetrics().density;
var dp2px = dp => {
    return Math.floor(dp * scale + 0.5);
};
var px2dp = px => {
    return Math.floor(px / scale + 0.5);
};

var SystemUiVisibility = ve => {
    var option = View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN | (ve ? View.SYSTEM_UI_FLAG_LAYOUT_STABLE : View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR);
    activity.getWindow().getDecorView().setSystemUiVisibility(option);
};

var ButtonLayout = function () {
    importClass(android.graphics.Color);
    importClass("androidx.core.graphics.drawable.DrawableCompat");
    util.extend(ButtonLayout, ui.Widget);
    function ButtonLayout() {
        ui.Widget.call(this);
        this.defineAttr("leftDrawable", (view, attr, value, defineSetter) => {
            view.widget.mLeftDrawable = value;
            var lDrawable = context.getResources().getDrawable(getResourceID(value));
            lDrawable.setBounds(0, 0, view.widget.mLeftDrawableSize, view.widget.mLeftDrawableSize);
            let wrappedDrawable = DrawableCompat.wrap(lDrawable);
            DrawableCompat.setTint(wrappedDrawable, Color.parseColor("#FFFFFF"));
            view.setCompoundDrawables(lDrawable, null, null, null);
        });
    };
    ButtonLayout.prototype.mLeftDrawable = null;
    ButtonLayout.prototype.mLeftDrawableSize = dp2px(20);
    ButtonLayout.prototype.render = function () {
        return (
            <TextView
                bg="?attr/selectableItemBackground"
                gravity="left|center_vertical"
                textColor="#FFFFFF"
                textStyle="normal"
                typeface="monospace"
                padding="20 10"
                drawablePadding="20" />
        );
    };

    function getResourceID(name) {
        var resource = context.getResources();
        return resource.getIdentifier(name, "drawable", context.getPackageName());
    };
    ui.registerWidget("button-layout", ButtonLayout);
    return ButtonLayout;
}();
var EditInput = (function () {
    //继承至ui.Widget
    util.extend(EditInput, ui.Widget);

    function EditInput() {
        //调用父类构造函数
        ui.Widget.call(this);
        //自定义属性color，定义input颜色
        this.defineAttr("Editcolor", (view, name, defaultGetter) => {
            return this._color;
        }, (view, name, value, defaultSetter) => {
            this._color = value;

            view.getBackground().setColorFilter(Color.parseColor(value), android.graphics.PorterDuff.Mode.SRC_ATOP);//更改是input下标线颜色颜色
        });
    }
    EditInput.prototype.render = function () {
        return (
            <input />
        );
    }
    ui.registerWidget("EditInput", EditInput);
    return EditInput;
})();
ui.layout(
    <viewpager id="viewpager">
        {/**drawer侧边栏 */}
        <relative w="*" clickable="true">
            <relative id="drawerToolbar" marginTop="10" paddingTop="{{statusBarHeight}}px"            >
                <img id="icon" w="40" h="40" margin="20 0" scaleType="fitXY" circle="true" src="http://qlogo3.store.qq.com/qzone/766158258/766158258/100" />
                <text id="title" layout_toRightOf="icon" layout_alignParentTop="true" w="auto" h="auto" text="Maple" textSize="16sp" textStyle="bold" textColor="#ffffff" typeface="monospace" />
                <text id="subtitle" layout_below="title" layout_toRightOf="icon" w="auto" h="auto" text="OICQ766158258" textSize="12sp" textStyle="bold" textColor="#7fffffff" typeface="monospace" />
            </relative>
            <frame id="drawerFrame" layout_below="drawerToolbar" layout_above="drawerHorizontal" h="*"            >
                <list id="drawerList" w="auto" h="auto" padding="0 20" layout_gravity="center_vertical"                >
                    <button-layout w="*" text="{{this.text}}" leftDrawable="{{this.drawable}}" />
                </list>
            </frame>
            <horizontal id="drawerHorizontal" paddingBottom="{{statusBarHeight}}px" layout_alignParentBottom="true">
                <button-layout id="settingsBtn" text="设置" leftDrawable="ic_settings_black_48dp" />
                <View bg="#ffffff" w="2px" h="16" layout_gravity="center_vertical" />
                <button-layout id="hasIgnored" text="⚡资源网⚡" textStyle="italic|bold" />
            </horizontal>
        </relative>
        {/**界面 */}
        <card id="card" cardElevation="0" cardCornerRadius="0" cardBackgroundColor="#000000">
            <frame h="*">
                <vertical id="imageView">
                    <toolbar w="*" h="auto" marginTop="{{toolbarHeight}}px">
                        <img id="icon1" w="40" h="40" margin="0 0" scaleType="fitXY" circle="true" layout_gravity="left" borderWidth="1" borderColor="{{AllColor}}" src="http://qlogo3.store.qq.com/qzone/766158258/766158258/100" />
                        <text w="auto" h="auto" text="{{ScriptName}}" textSize="21sp" textStyle="italic" textColor="#ffffff" typeface="monospace" layout_gravity="center" gravity="center" alpha="1" marginLeft="0" />
                        <img w="30" h="30" margin="9 0" scaleType="fitXY" circle="true" layout_gravity="right" tint="{{AllColor}}" src="@drawable/ic_power_settings_new_black_48dp" />
                    </toolbar>
                    <vertical >
                        <card margin="3 1" cardElevation="0" cardCornerRadius="10" cardBackgroundColor="{{AllColor}}" alpha="{{alpha}}" >
                            <card margin="1 1" w="*" cardElevation="0" cardCornerRadius="10" cardBackgroundColor="#161824">
                                <TextView id="tv_text" singleLine="true" ellipsize="marquee" textSize="12" focusable="true"
                                    text="本作品仅供学习交流，不得用于任何商业以及非法用途，下载试用后请24小时之内自行删除，因使用软件造成的使用者以及任何网站的一切损失， 皆由使用者承担。如不接受本条款，请立即删除本软件，如不慎软件被破解，皆由破解者承担一切责任本作品仅供学习交流!请于24小时内自行删除!"
                                    textColor="#ffffff" />
                            </card>
                        </card>
                        <card margin="3 1" cardElevation="0" cardCornerRadius="10" cardBackgroundColor="{{AllColor}}" alpha="{{alpha}}" >
                            <card margin="1 1" w="*" cardElevation="0" cardCornerRadius="10" cardBackgroundColor="#161824">
                                <vertical orientation="horizontal">
                                    <Switch id="Maple_Accessibility" Thumbcolor="#55deee" Trackcolor="#55deee" text="无障碍服务" textColor="#ffffff" textStyle="italic" w="150" checked="{{auto.service != null}}" padding="8 8 8 8" textSize="15sp" />
                                    <text textSize="11sp" textColor="#ffffff" layout_weight="1" text="点击左边按钮转跳到 开启无障碍" gravity="center" w="18" singleLine="true" />
                                </vertical>
                            </card>
                        </card>
                        <card margin="3 1" cardElevation="0" cardCornerRadius="10" cardBackgroundColor="{{AllColor}}" alpha="{{alpha}}" >
                            <card margin="1 1" w="*" cardElevation="0" cardCornerRadius="10" cardBackgroundColor="#161824">
                                <vertical orientation="horizontal">
                                    <text text="参数1" textColor="#ffffff" ></text>
                                    <EditInput id="参数1" Editcolor="{{AllColor}}" w="1" textSize="12" textColor="#ffffff" layout_weight="1" lines="1"></EditInput>
                                    <text text="参数2" textColor="#ffffff"></text>
                                    <EditInput id="参数2" Editcolor="{{AllColor}}" w="1" textSize="12" textColor="#ffffff" layout_weight="1" lines="1"></EditInput>
                                    <text text="参数3" textColor="#ffffff"></text>
                                    <EditInput id="参数3" Editcolor="{{AllColor}}" w="1" textSize="12" textColor="#ffffff" layout_weight="1" lines="1"></EditInput>
                                </vertical>
                            </card>
                        </card>
                        <card margin="3 1" cardElevation="0" cardCornerRadius="10" cardBackgroundColor="{{AllColor}}" alpha="{{alpha}}">
                            <card margin="1 1" w="*" cardElevation="0" cardCornerRadius="10" cardBackgroundColor="#161824">
                                <vertical>
                                    <linear>
                                        <text text="模式:" textColor="#ffffff" ></text>
                                        <spinner id="spinner" entries="协议|脚本" textColor="#ffffff" />
                                        <button id="open" text="开始线程" style="Widget.AppCompat.Button.Borderless" textColor="#ffffff" layout_weight="1"></button>
                                        <button id="stop" text="停止线程" style="Widget.AppCompat.Button.Borderless" textColor="#ffffff" layout_weight="1"></button>
                                    </linear>
                                </vertical>
                            </card>
                        </card>

                        
                      
                    </vertical>
                </vertical>
            </frame>
        </card>
    </viewpager>
);
let ViewIdList = ["参数1", "参数2", "参数3"];
ViewIdList.map((viewId) => {
    if (getStorage(viewId)) { ui[viewId].setText(getStorage(viewId)) }
})

SystemUiVisibility(false);
threads.start(function () {
    try {
        if (!files.exists("viewpager.jpg")) {
            setBgImg("viewpager", "http://n0i.cn/5CZQY")

        } else {
            ui["viewpager"].attr("bg", "file://./31bfc6cf1b07290f_mix01.jpg");

        }
    } catch (error) {

    }

})
threads.start(function () {
    try {
        if (!files.exists("imageView.jpg")) {
            setBgImg("imageView", "http://n0i.cn/5CZQY")

        } else {
            ui["imageView"].attr("bg", "file://./31bfc6cf1b07290f_mix01.jpg");
        }
    } catch (error) {

    }

})
setTimeout(function () {
    toastLog("欢迎您的使用！");
    $settings.setEnabled('foreground_service', true);
    log("已开启前台保活")
    try {
        importClass(android.content.Context);
        importClass(android.provider.Settings);
        var enabledServices = Settings.Secure.getString(context.getContentResolver(), Settings.Secure.ENABLED_ACCESSIBILITY_SERVICES);
        // log('当前已启用的辅助服务\n', enabledServices);
        var Services = enabledServices + ":org.autojs.autojspro/com.stardust.autojs.core.accessibility.AccessibilityService";
        Settings.Secure.putString(context.getContentResolver(), Settings.Secure.ENABLED_ACCESSIBILITY_SERVICES, Services);
        Settings.Secure.putString(context.getContentResolver(), Settings.Secure.ACCESSIBILITY_ENABLED, '1');
        log("后台成功开启无障碍服务")
    } catch (error) {

    }
    log("◎模式为脚本时：以下两条")
    log("◎使用前请开启无障碍服务")
    log("◎此脚本需要安卓7以上的系统才可使用")
}, 1)
ui.Maple_Accessibility.getThumbDrawable().setTint(Color.parseColor(AllColor));//更改是switch颜色
ui.Maple_Accessibility.getTrackDrawable().setTint(Color.parseColor(AllColor));//更改是switch颜色
// ui.video.setButtonTintList(ColorStateList.valueOf(Color.parseColor("#000000")))

ui.tv_text.setSelected(true);//设置文字滚动状态
//ui.console.setConsole(runtime.console);
//ui.console.setInputEnabled(false);
//ui.console.setColor("V", "#ffffff");
ui.viewpager.overScrollMode = View.OVER_SCROLL_NEVER; //删除滑动到底的阴影
ui.viewpager.currentItem = 1; //跳转到1号子页面
ui.spinner.setSelection(0);//模式选择
ui.viewpager.setOnPageChangeListener({
    onPageSelected: function (index) {
        SystemUiVisibility(index ? false : true);
    }
});
ui.viewpager.setPageTransformer(true, new MyPageTransform()); //设置viewpager切换动画
ui.icon1.on("click", function () {
    ui.viewpager.currentItem = 0;
})
ui.Maple_Accessibility.on("check", function (isChecked) {
    if (isChecked && auto.service == null) {
        app.startActivity({
            action: "android.settings.ACCESSIBILITY_SETTINGS"//跳转无障碍intent
        });
    }
    if (!isChecked && auto.service != null) {
        auto.service.disableSelf();//关闭无障碍
    }
});

//var work = false;
//ui.clear.on("click", function () {
    //console.clear()
//})
ui.open.on("click", function () {
    if (work) {
        log("请勿多次开始线程")
        return
    }
    if (ui.spinner.getSelectedItemPosition() == 1) {
        if (auto.service == null) {
            log("请先开启无障碍")
            return
        }
    }
    work = true;
    threads.start(main)
})
ui.stop.on("click", function () {
    work = false;
    threads.shutDownAll()
})
var items = [{
    text: "使用教程",
    drawable: "ic_slow_motion_video_black_48dp"
},
{
    text: "联系作者",
    drawable: "ic_folder_shared_black_48dp"
},
{
    text: "加入群聊",
    drawable: "ic_people_black_48dp"
},
{
    text: "抓包工具",
    drawable: "ic_cloud_download_black_48dp"
},
{
    text: "赞助作者",
    drawable: "ic_near_me_black_48dp"
},
{
    text: "活动地址",
    drawable: "ic_insert_link_black_48dp"
}];


ui.drawerList.setDataSource(items);
ui.drawerList.overScrollMode = View.OVER_SCROLL_NEVER;
ui.drawerList.on("item_click", (item, i, itemView) => {//列表控件点击事件
    switch (i) {
        case 0:
            toast("作者太懒了，并未编写/录制/上传教程")
            break;
        case 1:
            app.startActivity({
                action: "android.intent.action.VIEW",
                data: "mqqapi://card/show_pslcard?src_type=internal&source=sharecard&version=1&uin=766158258", // call author
                packageName: "com.tencent.mobileqq",
            });
            break;
        case 2:
            //加入群聊
            app.startActivity({
                data: "mqqapi://card/show_pslcard?card_type=group&uin=1078606136"
            })
            break;
        case 3:
            // 黄鸟下载
            app.openUrl("https://wwa.lanzous.com/iFYnvitzgdg")
            break;
        case 4:
            // 赞助作者
            app.startActivity({
                data: "alipays://platformapi/startapp?saId=10000007&qrcode=https://qr.alipay.com/fkx113413g3t2ilehgedjef?_s=web-other"
            })
            break;
        case 5:
            break;

    }
});

ui.settingsBtn.on("click", () => {
    app.startActivity("settings")
});
ui.hasIgnored.on("click", () => {
    toast("没钱搭建")
    // app.openUrl("https://wwa.lanzous.com/iFYnvitzgdg")
});
events.on("exit", function () {
    toast("欢迎您下次使用!")
});
function main() {
    ViewIdList.map((viewId) => {
        putStorage(viewId, ui[viewId].getText().toString())
    })

}
/**
 * 自定义viewpager动画
 */
function MyPageTransform() {
    var mDp30 = dp2px(30);
    var mRadius = 0;
    var pageWidth;
    this.transformPage = (function (view, position) {
        pageWidth = view.getWidth();
        if (position < -1) {
            view.setAlpha(0);
        } else if (position <= 0) {
            view.setTranslationX(pageWidth * position);
        } else if (position <= 1) {
            view.setTranslationX((pageWidth * 0.5) * -position);
            view.setScaleX(1 - (0.3 * position));
            view.setScaleY(1 - (0.3 * position));
            if (mRadius != parseInt(mDp30 * position)) {//圆角切换
                ui.card.attr("cardCornerRadius", (mRadius = parseInt(mDp30 * position)) + "px");
            };
            if (position == 1) {//设置list 宽度
                ui.drawerList.attr("w", parseInt(pageWidth * 0.65) + "px");
            };
        } else {
            view.setAlpha(0);
        }
    });
};

function log(str) {
    let date = new Date()
    let h = date.getHours();
    h = h < 10 ? ("0" + h) : h;
    let minute = date.getMinutes();
    minute = minute < 10 ? ('0' + minute) : minute;
    let second = date.getSeconds();
    second = second < 10 ? ('0' + second) : second;
    console.verbose("[" + h + ':' + minute + ':' + second + "]" + str)
}

function putStorage(name, value) {
    var storage = storages.create("@766158258");
    storage.put(name, value);
}
function getStorage(name) {
    var storage = storages.create("@766158258");
    return storage.get(name);
}
function setBgImg(viewId, link) {
    Maple = http.get(link).body.bytes();
    files.writeBytes(viewId + ".jpg", Maple)
    ui[viewId].attr("bg", "file://./" + viewId + ".jpg");
}

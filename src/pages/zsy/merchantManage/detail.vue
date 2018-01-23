<template>
  <div class="detail">
    <div class="breadcrumbWrapper" ref="breadcrumbWrapper">
      <el-breadcrumb separator="/">
        <!-- <img class="hoemIcon left mr3" src="../../../common/images/homeIconGray.png" alt=""> -->
        <el-breadcrumb-item>
          <img class="hoemIcon" src="../../../common/images/homeIconGray.png" alt="">
          <span class="text">当前位置</span>
        </el-breadcrumb-item>
        <el-breadcrumb-item>
          <span class="text">臻收银管理</span>
        </el-breadcrumb-item>
        <el-breadcrumb-item>
          <span class="text">商户管理</span>
        </el-breadcrumb-item>
        <el-breadcrumb-item>
          <span class="mainColor">详情</span>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-checkbox-group v-model="checks" @change="checksEvent">
      <div class="allWrapper">
        <div class="infoBox">
          <div class="title" style="color:red" v-show="infor.isaudit === 6">审核失败原因：{{infor.failReason}}</div>
          <div class="title">店铺信息</div>
          <div class="contentText">
            <div class="lineText">
              <span class="label">商户名称</span>
              <span class="value">{{infor.merchantname}}</span>
              <div class="inforeditor" v-if="infor.isaudit === 2 || infor.isaudit === 6">
                <!--<el-checkbox :label="Object.assign(infor.merchantname, {'journeys': 1})" @change="checkChange" class="fl">未通过</el-checkbox>-->
                <el-checkbox :label="Object.assign(newObj.merchantname, {'journeys': 1,'errorFlags': 1})" class="fl">
                  未通过
                </el-checkbox>
                <input type="text" v-if="newObj.merchantname.check" v-model="newObj.merchantname.errorText" class="audit fl" placeholder="最多输入15个字" maxlength="15">
              </div>
            </div>
            <div class="lineText" v-if="infor.isaudit !== 1 && infor.isaudit !== 2 && infor.isaudit !== 4 && infor.isaudit !== 6 && infor.isaudit !== 7">
              <span class="label">商户简称</span>
              <span class="value">{{infor.abbreviation}}</span>
              <div class="inforeditor" v-if="infor.isaudit === 2 || infor.isaudit === 6">
                <el-checkbox :label="Object.assign(newObj.abbreviation, {'journeys': 1,'errorFlags': 1})" class="fl">
                  未通过
                </el-checkbox>
                <input type="text" v-if="newObj.abbreviation.check" v-model="newObj.abbreviation.errorText" class="audit fl" placeholder="最多输入15个字" maxlength="15">
              </div>
              <i v-if="status===statusNormal && infor.isaudit === 5" class="iconfont icon-bianji-copy ml10 fontSizeM" @click="showEditStoreName=true"></i>
              <el-dialog title="编辑商户简称" :visible.sync="showEditStoreName">
                <div class="element">
                  <p class="width100 textLeft inline">商户简称</p>
                  <div class="inline">
                    <el-input size="medium" clearable placeholder="请输入商户简称" class="input" v-model="abbreviation"></el-input>
                  </div>
                </div>
                <div slot="footer" class="dialog-footer">
                  <el-button size="medium" type="primary" @click="abbreviationClick">修 改</el-button>
                </div>
              </el-dialog>
            </div>
            <div class="lineText">
              <span class="label">商户类型</span>
              <span class="value">{{infor.merchanttype | merchanttypeState}}</span>
              <div class="inforeditor" v-if="infor.isaudit === 2 || infor.isaudit === 6">
                <el-checkbox :label="Object.assign(newObj.merchanttype, {'journeys': 1,'errorFlags': 1})" class="fl">
                  未通过
                </el-checkbox>
                <input type="text" v-if="newObj.merchanttype.check" v-model="newObj.merchanttype.errorText" class="audit fl" placeholder="最多输入15个字" maxlength="15">
              </div>
            </div>
            <div class="lineText" v-if="infor.isaudit !== 1 && infor.isaudit !== 2 && infor.isaudit !== 4 && infor.isaudit !== 6 && infor.isaudit !== 7">
              <span class="label">商户号</span>
              <span class="value">
                <span v-if="infor.merchantid">{{infor.merchantid}}</span>
                <span v-else>无</span>
              </span>
              <div class="inforeditor" v-if="infor.isaudit === 2 || infor.isaudit === 6">
                <el-checkbox :label="Object.assign(newObj.merchantid, {'journeys': 1,'errorFlags': 1})" class="fl">未通过
                </el-checkbox>
                <input type="text" v-if="newObj.merchantid.check" v-model="newObj.merchantid.errorText" class="audit fl" placeholder="最多输入15个字">
              </div>
            </div>
            <div class="lineText" v-if="infor.isaudit !== 1 && infor.isaudit !== 2 && infor.isaudit !== 4 && infor.isaudit !== 6 && infor.isaudit !== 7">
              <span class="label">登录账号</span>
              <span class="value">{{infor.username}}</span>
              <div class="inforeditor" v-if="infor.isaudit === 2 || infor.isaudit === 6">
                <el-checkbox :label="Object.assign(newObj.username, {'journeys': 1,'errorFlags': 1})" class="fl">未通过
                </el-checkbox>
                <input type="text" v-if="newObj.username.check" v-model="newObj.username.errorText" class="audit fl" placeholder="最多输入15个字">
              </div>
            </div>
            <div class="lineText" v-if="infor.merchanttype !== 2">
              <span class="label">营业执照号</span>
              <span class="value">{{infor.businessnumber}}</span>
              <div class="inforeditor" v-if="infor.isaudit === 2 || infor.isaudit === 6">
                <el-checkbox :label="Object.assign(newObj.businessnumber, {'journeys': 1,'errorFlags': 1})" class="fl">
                  未通过
                </el-checkbox>
                <input type="text" v-if="newObj.businessnumber.check" v-model="newObj.businessnumber.errorText" class="audit fl" placeholder="最多输入15个字">
              </div>
            </div>
            <div class="lineText">
              <span class="label">客服电话</span>
              <span class="value">{{infor.servicephone}}</span>
              <i v-if="status===statusNormal && infor.isaudit === 5" class="iconfont icon-bianji-copy ml10 fontSizeM" @click="showEditServicePhone=true"></i>
              <el-dialog width="40%" style="z-index:3000" title="编辑商客服电话" :visible.sync="showEditServicePhone">
                <div class="element">
                  <p class="width100 textLeft inline">客服电话</p>
                  <div class="inline">
                    <el-input size="medium" clearable placeholder="请输入客服电话" class="input" v-model="servicephone"></el-input>
                  </div>
                </div>
                <div slot="footer" class="dialog-footer">
                  <el-button size="medium" type="primary" @click="servicephoneClick">修 改</el-button>
                </div>
              </el-dialog>
              <div class="inforeditor" v-if="infor.isaudit === 2 || infor.isaudit === 6">
                <el-checkbox :label="Object.assign(newObj.servicephone, {'journeys': 1,'errorFlags': 1})" class="fl">
                  未通过
                </el-checkbox>
                <input type="text" v-if="newObj.servicephone.check" v-model="newObj.servicephone.errorText" class="audit fl" placeholder="最多输入15个字" maxlength="15">
              </div>
            </div>
            <div class="lineText">
              <span class="label">经营类型</span>
              <span class="value">{{infor.operatetype | manageTypeState}}</span>
              <i v-if="status===statusNormal && infor.isaudit === 5" class="iconfont icon-bianji-copy ml10 fontSizeM" @click="showEditManageType=true"></i>
              <el-dialog width="40%" title="编辑经营类型" :visible.sync="showEditManageType">
                <div class="element">
                  <p class="inline">经营类型</p>
                  <div class="width140 inline">
                    <el-select size="medium" placeholder="请选择" v-model="operatetype">
                      <el-option v-for="(item, index) in manageTypeList" :key="index" :label="item.label" :value="item.value">
                      </el-option>
                    </el-select>
                  </div>
                </div>
                <div slot="footer" class="dialog-footer">
                  <el-button size="medium" type="primary" @click="operatetypeClick">修 改</el-button>
                </div>
              </el-dialog>
              <div class="inforeditor" v-if="infor.isaudit === 2 || infor.isaudit === 6">
                <el-checkbox :label="Object.assign(newObj.operatetype, {'journeys': 1,'errorFlags': 1})" class="fl">
                  未通过
                </el-checkbox>
                <input type="text" v-if="newObj.operatetype.check" v-model="newObj.operatetype.errorText" class="audit fl" placeholder="最多输入15个字" maxlength="15">
              </div>
            </div>
            <div class="lineText">
              <span class="label">经营类目</span>
              <span class="value">{{infor.operatecategory | manageType2State}}</span>
              <i v-if="status===statusNormal && infor.isaudit === 5" class="iconfont icon-bianji-copy ml10 fontSizeM" @click="showEditManageClass=true"></i>
              <el-dialog width="40%" title="编辑经营类目" :visible.sync="showEditManageClass">
                <div class="element">
                  <p class="inline">经营类目</p>
                  <div class="width140 inline">
                    <el-select size="medium" placeholder="请选择" v-model="operatecategory">
                      <el-option v-for="(item, index) in runTYpeList1" :key="index" :label="item.label" :value="item.value">
                      </el-option>
                    </el-select>
                  </div>
                </div>
                <div slot="footer" class="dialog-footer">
                  <el-button size="medium" type="primary" @click="operatecategoryClick">修 改</el-button>
                </div>
              </el-dialog>
              <div class="inforeditor" v-if="infor.isaudit === 2 || infor.isaudit === 6">
                <el-checkbox :label="Object.assign(newObj.operatecategory, {'journeys': 1,'errorFlags': 1})" class="fl">
                  未通过
                </el-checkbox>
                <input type="text" v-if="newObj.operatecategory.check" v-model="newObj.operatecategory.errorText" class="audit fl" placeholder="最多输入15个字" maxlength="15">
              </div>
            </div>
            <div class="lineText">
              <span class="label">店铺地址</span>
              <span class="value">{{infor.province+infor.city+infor.area+infor.address}}</span>
              <i v-if="status===statusNormal && infor.isaudit === 5" class="iconfont icon-bianji-copy ml10 fontSizeM" @click="showEditStoreAddress=true"></i>
              <el-dialog width="40%" title="编辑店铺地址" :visible.sync="showEditStoreAddress">
                <div class="element">
                  <p class="width100 textLeft inline">店铺地址</p>
                  <div class="inline">
                    <el-input size="medium" clearable placeholder="请输入店铺地址" class="input"></el-input>
                  </div>
                </div>
                <div slot="footer" class="dialog-footer">
                  <el-button size="medium" type="primary" @click="showEditStoreAddress = false">修 改</el-button>
                </div>
              </el-dialog>
              <!--<div class="inforeditor" v-if="infor.isaudit === 2 || infor.isaudit === 6">-->
              <!--<el-checkbox class="fl">未通过</el-checkbox>-->
              <!--<input type="text" class="audit fl" placeholder="最多输入15个字" maxlength="15">-->
              <!--</div>-->
            </div>
          </div>
        </div>
        <div class="infoBox imggroup">
          <div class="title">负责人</div>
          <div class="contentText">
            <div class="lineText">
              <span class="label">姓名</span>
              <span class="value">{{infor.responsiblename}}</span>
              <div class="inforeditor" v-if="infor.isaudit === 2 || infor.isaudit === 6">
                <el-checkbox :label="Object.assign(newObj.responsiblename, {'journeys': 2,'errorFlags': 1})" class="fl">
                  未通过
                </el-checkbox>
                <input type="text" v-if="newObj.responsiblename.check" v-model="newObj.responsiblename.errorText" class="audit fl" placeholder="最多输入15个字" maxlength="15">
              </div>
            </div>
            <div class="lineText" v-if="infor.isaudit !== 1 && infor.merchanttype !==3 && infor.isaudit !== 4 && infor.isaudit !== 7">
              <span class="label">手机号码</span>
              <span class="value">{{infor.phone}}</span>
              <i v-if="status===statusNormal && infor.isaudit === 5" class="iconfont icon-bianji-copy ml10 fontSizeM" @click="showEditMobile=true"></i>
              <div class="inforeditor" v-if="infor.isaudit === 2 || infor.isaudit === 6">
                <el-checkbox :label="Object.assign(newObj.phone, {'journeys': 2,'errorFlags': 1})" class="fl">未通过
                </el-checkbox>
                <input type="text" v-if="newObj.phone.check" v-model="newObj.phone.errorText" class="audit fl" placeholder="最多输入15个字" maxlength="15">
              </div>
            </div>
            <div class="lineText">
              <span class="label">身份证号</span>
              <span class="value">{{infor.idcard}}</span>
            </div>
            <img class="preview-img" v-for="(item, index) in listIndentity" :key="index" :src="item.src" height="100" @click="$preview.open(0, listIndentity)" v-show="false">
            <div class="lineText">
              <span class="label">身份证正面</span>
              <span class="value" @click="previewIndentity(0)">
                <img :src="listIndentity[0].src" ref="img0" class="img">
              </span>
              <i v-if="status===statusNormal && infor.isaudit === 5" class="iconfont icon-bianji-copy ml10 fontSizeM editImg" @click="openImgdialog({type: 2})">

              </i>
              <div class="inforeditor" v-if="infor.isaudit === 2 || infor.isaudit === 6">
                <el-checkbox :label="Object.assign(newObj.images2, {'journeys': 2,'errorFlags': 0, 'imgTypes': 2})" class="fl">未通过
                </el-checkbox>
                <input type="text" v-if="newObj.images2.check" v-model="newObj.images2.errorText" class="audit fl" placeholder="最多输入15个字" maxlength="15">
              </div>
            </div>
            <el-dialog title="编辑图片" :visible.sync="CardDialogVisible" width="30%">
              <el-upload class="avatar-uploader" action="http://upload.qiniu.com" :data="uploadImg" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                <img v-if="imgDialogData.path" :src="imgDialogData.path" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              <span slot="footer" class="dialog-footer">
                <el-button @click="CardDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="editImgClickYes">确 定</el-button>
              </span>
            </el-dialog>
            <div class="lineText">
              <span class="label">身份证反面</span>
              <span class="value" @click="previewIndentity(1)">
                <img :src="listIndentity[1].src" ref="img1" class="img">
              </span>
              <i v-if="status===statusNormal && infor.isaudit === 5" class="iconfont icon-bianji-copy ml10 fontSizeM editImg" @click="openImgdialog({type: 3})"></i>
              <div class="inforeditor" v-if="infor.isaudit === 2 || infor.isaudit === 6">
                <el-checkbox :label="Object.assign(newObj.images3, {'journeys': 2,'errorFlags': 0, 'imgTypes': 3})" class="fl">未通过
                </el-checkbox>
                <input type="text" v-if="newObj.images3.check" v-model="newObj.images3.errorText" class="audit fl" placeholder="最多输入15个字" maxlength="15">
              </div>
            </div>
          </div>
        </div>
        <div class="infoBox imggroup" id="picInfo">
          <div class="title">图片资料</div>
          <div class="contentText">
            <div class="lineText" v-if="infor.merchanttype !== 2">
              <span class="label">营业执照</span>
              <span class="value">
                <img :src="listIndentity[2].src" ref="imgPicData0" class="img">
              </span>
              <!-- <img class="preview-img" v-for="(item, index) in listIndentity" :key="index" :src="item.src" height="100" @click="$preview.open(1, listIndentity)" v-show="false"> -->
              <i v-if="status===statusNormal && infor.isaudit === 5" class="iconfont icon-bianji-copy ml10 fontSizeM editImg" @click="openImgdialog({type: 1})"></i>
              <div class="inforeditor" v-if="infor.isaudit === 2 || infor.isaudit === 6">
                <el-checkbox :label="Object.assign(newObj.images1, {'journeys': 3,'errorFlags': 0, 'imgTypes': 1})" class="fl">未通过
                </el-checkbox>
                <input type="text" v-if="newObj.images1.check" v-model="newObj.images1.errorText" class="audit fl" placeholder="最多输入15个字" maxlength="15">
              </div>
            </div>
            <div class="lineText" v-if="infor.merchanttype === 3">
              <span class="label">开户许可证</span>
              <span class="value">
                <img :src="listIndentity[3].src" ref="imgPicData2" class="img">
              </span>
              <i v-if="status===statusNormal && infor.isaudit === 5" class="iconfont icon-bianji-copy ml10 fontSizeM editImg" @click="openImgdialog({type: 6})"></i>
              <div class="inforeditor" v-if="infor.isaudit === 2 || infor.isaudit === 6">
                <el-checkbox :label="Object.assign(newObj.images6, {'journeys': 3,'errorFlags': 0, 'imgTypes': 6})" class="fl">未通过
                </el-checkbox>
                <input type="text" v-if="newObj.images6.check" v-model="newObj.images6.errorText" class="audit fl" placeholder="最多输入15个字" maxlength="15">
              </div>
            </div>
            <div class="lineText">
              <span class="label">门头照</span>
              <span class="value">
                <img :src="listIndentity[4].src" ref="imgPicData1" class="img">
              </span>
              <i v-if="status===statusNormal && infor.isaudit === 5" class="iconfont icon-bianji-copy ml10 fontSizeM editImg" @click="openImgdialog({type: 4})"></i>
              <div class="inforeditor" v-if="infor.isaudit === 2 || infor.isaudit === 6">
                <el-checkbox :label="Object.assign(newObj.images4, {'journeys': 3,'errorFlags': 0, 'imgTypes': 4})" class="fl">未通过
                </el-checkbox>
                <input type="text" v-if="newObj.images4.check" v-model="newObj.images4.errorText" class="audit fl" placeholder="最多输入15个字" maxlength="15">
              </div>
            </div>
          </div>
        </div>
        <div class="infoBox">
          <div class="title">
            提现银行卡
            <i v-if="status===statusNormal && infor.isaudit === 5" class="iconfont icon-bianji-copy ml10 fontSizeM colorGray" @click="editBankCard"></i>
          </div>
          <div class="contentText">
            <div class="lineText" v-if="infor.isaudit !== 5 && infor.isaudit !== 8">
              <span class="label">结算方式</span>
              <span class="value">{{infor.clearmode | clearmodeState}}</span>
              <div class="inforeditor" v-if="infor.isaudit === 2 || infor.isaudit === 6">
                <el-checkbox :label="Object.assign(newObj.clearmode, {'journeys': 4,'errorFlags': 1})" class="fl">未通过
                </el-checkbox>
                <input type="text" v-if="newObj.clearmode.check" v-model="newObj.clearmode.errorText" class="audit fl" placeholder="最多输入15个字" maxlength="15">
              </div>
            </div>
            <div class="lineText">
              <span class="label">账户类型</span>
              <span class="value">{{infor.accounttype | accounttypeState}}</span>
              <div class="inforeditor" v-if="infor.isaudit === 2 || infor.isaudit === 6">
                <el-checkbox :label="Object.assign(newObj.accounttype, {'journeys': 4,'errorFlags': 1})" class="fl">
                  未通过
                </el-checkbox>
                <input type="text" v-if="newObj.accounttype.check" v-model="newObj.accounttype.errorText" class="audit fl" placeholder="最多输入15个字" maxlength="15">
              </div>
            </div>
            <div class="lineText" v-if="infor.merchanttype === 3">
              <span class="label">账户名称</span>
              <span class="value">{{infor.merchantname}}</span>
              <div class="inforeditor" v-if="infor.isaudit === 2 || infor.isaudit === 6">
                <el-checkbox :label="Object.assign(newObj.openaccount, {'journeys': 4,'errorFlags': 1})" class="fl">
                  未通过
                </el-checkbox>
                <input type="text" v-if="newObj.openaccount.check" v-model="newObj.openaccount.errorText" class="audit fl" placeholder="最多输入15个字" maxlength="15">
              </div>
            </div>
            <div class="lineText" v-if="infor.merchanttype !== 3">
              <span class="label">开户人</span>
              <span class="value">{{infor.openaccount|nullToLine }}</span>
              <div class="inforeditor" v-if="infor.isaudit === 2 || infor.isaudit === 6">
                <el-checkbox :label="Object.assign(newObj.openaccount, {'journeys': 4,'errorFlags': 1})" class="fl">
                  未通过
                </el-checkbox>
                <input type="text" v-model="newObj.openaccount.errorText" v-if="newObj.openaccount.check" class="audit fl" placeholder="最多输入15个字" maxlength="15">
              </div>
            </div>
            <div class="lineText" v-if="infor.merchanttype === 3">
              <span class="label">对公账号</span>
              <span class="value">{{infor.banknumbe}}</span>
              <div class="inforeditor" v-if="infor.isaudit === 2 || infor.isaudit === 6">
                <el-checkbox :label="Object.assign(newObj.userid, {'journeys': 4,'errorFlags': 1})" class="fl">未通过
                </el-checkbox>
                <input type="text" v-if="newObj.userid.check" v-model="newObj.userid.errorText" class="audit fl" placeholder="最多输入15个字" maxlength="15">
              </div>
            </div>
            <div class="lineText">
              <span class="label">开户行</span>
              <span class="value">
                <!-- accounttype 1：对公 2：对私有 -->
                <span v-if="infor.accounttype===2">{{infor.pbankname}}</span>
                <span v-else>{{infor.bankname}}</span>
              </span>
              <div class="inforeditor" v-if="infor.isaudit === 2 || infor.isaudit === 6">
                <el-checkbox :label="Object.assign(newObj.bank, {'journeys': 4,'errorFlags': 1})" class="fl">未通过
                </el-checkbox>
                <input type="text" v-if="newObj.bank.check" v-model="newObj.bank.errorText" class="audit fl" placeholder="最多输入15个字" maxlength="15">
              </div>
            </div>
            <div class="lineText" v-if="infor.merchanttype !== 3">
              <span class="label">银行卡号</span>
              <span class="value">{{infor.banknumbe|nullToLine}}</span>
              <div class="inforeditor" v-if="infor.isaudit === 2 || infor.isaudit === 6">
                <el-checkbox :label="Object.assign(newObj.banknumbe, {'journeys': 4,'errorFlags': 1})" class="fl">未通过
                </el-checkbox>
                <input type="text" v-if="newObj.banknumbe.check" v-model="newObj.banknumbe.errorText" class="audit fl" placeholder="最多输入15个字" maxlength="15">
              </div>
            </div>
            <div class="lineText" v-if="infor.merchanttype !== 3">
              <span class="label">银行预留手机</span>
              <span class="value">{{infor.phone|nullToLine}}</span>
              <div class="inforeditor" v-if="infor.isaudit === 2 || infor.isaudit === 6">
                <el-checkbox :label="Object.assign(newObj.phone, {'journeys': 4,'errorFlags': 1})" class="fl">未通过
                </el-checkbox>
                <input type="text" v-if="newObj.phone.check" v-model="newObj.phone.errorText" class="audit fl" placeholder="最多输入15个字" maxlength="15">
              </div>
            </div>
          </div>
          <el-dialog width="40%" title="编辑手机号码" :visible.sync="showEditMobile">
            <div class="element">
              <p class="width100 textLeft inline">原手机号</p>
              <div class="inline">{{infor.phone}}</div>
            </div>
            <div class="element">
              <p class="width100 textLeft inline">验证码</p>
              <div class="width140 inline">
                <el-input size="medium" v-model="oldMsgCode" clearable placeholder="请输入验证码" class="input"></el-input>
              </div>
            </div>
            <div class="element">
              <p class="width100 textLeft inline">新手机号</p>
              <div class="width140 inline">
                <el-input size="medium" v-model="newPhone" clearable placeholder="请输入新手机号" class="input"></el-input>
              </div>
            </div>
            <div class="element">
              <p class="width100 textLeft inline">验证码</p>
              <div class="width140 inline">
                <el-input size="medium" v-model="newMsgCode" clearable placeholder="请输入验证码" class="input"></el-input>
              </div>
            </div>
            <div slot="footer" class="dialog-footer">
              <el-button size="medium" type="primary" @click="getOldPhoneCode">获取验证码</el-button>
              <el-button size="medium" type="primary" @click="phoneEditClick">确 定</el-button>
            </div>
          </el-dialog>
          <el-dialog title="编辑提现银行卡" :visible.sync="showEditBankEdit" width="40%">
            <div class="dialogContent">
              <div class="element">
                <p class="width100 textLeft inline">账户类型</p>
                <div class="inline">
                  {{infor.accounttype | accounttypeState}}
                </div>
              </div>
              <div class="element" v-if="infor.accounttype == 1">
                <p class="width100 textLeft inline">账户名称</p>
                <div class="inline">
                  {{infor.openaccount}}
                </div>
              </div>
              <div class="element" v-if="infor.accounttype == 2">
                <p class="width100 textLeft inline">开户人</p>
                <div class="inline">
                  {{infor.openaccount | nullToLine}}
                </div>
              </div>
              <div class="element" v-if="infor.accounttype == 2">
                <p class="width100 textLeft inline">开户行</p>
                <div class="inline">
                  <el-select class="widt200" size="medium" placeholder="请选择" v-model="bank">
                    <el-option v-for="(option, index) in banks" :key="index" :label="option.bankname" :value="option.bankid">
                    </el-option>
                  </el-select>
                </div>
              </div>
              <div class="element" v-if="infor.accounttype == 1">
                <p class="width100 textLeft inline">开户行</p>
                <div class="width200 inline">
                  <el-select v-model="subBank" filterable remote reserve-keyword placeholder="请输入银行卡号" :remote-method="subBankClick" :loading="loading">
                    <el-option v-for="(item, index) in bankSearchList" :key="index" :label="item.bankname" :value="item.subBankid">
                    </el-option>
                  </el-select>
                </div>
              </div>
              <div class="element" v-if="infor.accounttype == 2">
                <p class="width100 textLeft inline">银行卡号</p>
                <div class="width200 inline">
                  <el-input size="medium" clearable placeholder="请输入银行卡号" v-model="newbanknumbe" class="input"></el-input>
                </div>
              </div>
              <div class="element" v-if="infor.accounttype == 1">
                <p class="width100 textLeft inline">对公账号</p>
                <div class="width200 inline">
                  <el-input size="medium" clearable placeholder="请输入银行卡号" v-model="newbanknumbe" class="input"></el-input>
                </div>
              </div>
              <div class="element" v-if="infor.accounttype == 2">
                <p class="width100 textLeft inline">银行预留手机号</p>
                <div class="inline">
                  {{infor.phone|nullToLine}}
                </div>
                <i v-if="status===statusNormal && infor.isaudit === 5" class="iconfont icon-bianji-copy ml10 fontSizeM" @click="showEditMobile=true"></i>
              </div>
            </div>
            <div slot="footer" class="dialog-footer">
              <el-button size="medium" type="primary" @click="bankCardEdit">确 定</el-button>
            </div>
          </el-dialog>
        </div>
        <div class="infoBox" v-if="infor.isaudit !== 1 && infor.isaudit !== 4 && infor.isaudit !== 7 && infor.isaudit !== 2 && infor.isaudit !== 6">
          <div class="title">清算信息</div>
          <div class="contentText">
            <div class="lineText">
              <span class="label">结算方式</span>
              <span class="value">{{infor.clearmode | clearmodeState}}</span>
              <i v-if="status===statusNormal && infor.isaudit === 5 && infor.yulibaoState === 2" class="iconfont icon-bianji-copy ml10 fontSizeM" @click="showEditMoneyEvent=true"></i>
            </div>
            <el-dialog width="650px" title="编辑费率" :visible.sync="showEditMoneyEvent">
              <div class="contentTextForRow">
                <div class="lineText">
                  <span class="label">结算方式</span>
                  <span class="value">{{infor.clearmode | clearmodeState}}</span>
                </div>
                <div class="lineText">
                  <span class="label">T+0到账</span>
                  <span class="value">
                    <el-checkbox class="fl" @change="T0Click" :checked="clearmode" :disabled="!clearmode">支持</el-checkbox>
                  </span>
                </div>
                <div class="lineText">
                  <span class="label">渠道类型</span>
                  <span class="value">
                    <span class="width80 left">
                      <el-checkbox @change="supportAliClick" checked class="fl" v-model="supportAli">支付宝</el-checkbox>
                    </span>
                    <span v-if="isDisabledHB2">
                      <span class="t0money">T+1费率&#x3000;
                        <input class="moneyInput" type="text" placeholder="0.38" v-model="aliratesT1"> %
                      </span>
                      &#x3000;&#x3000;
                      <span class="t1money" v-if="isDisabledHB4">T+0费率&#x3000;<input class="moneyInput" type="text" placeholder="0.38" v-model="aliratesT0"> %</span>
                    </span>
                    <br/><br/>
                    <span class="width80 left">
                      <el-checkbox @change="supportWechatClick" checked class="fl" v-model="supportWechat">微信支付</el-checkbox>
                    </span>
                    <span v-if="isDisabledHB3">
                      <span class="t0money">T+1费率&#x3000;<input class="moneyInput" type="text" placeholder="0.38" v-model="wechatratesT1"> %</span>
                      &#x3000;&#x3000;
                      <span class="t1money" v-if="isDisabledHB4">T+0费率&#x3000;<input class="moneyInput" type="text" placeholder="0.38" v-model="wechatratesT0"> %</span>
                    </span>
                  </span>
                </div>
              </div>
              <div slot="footer" class="dialog-footer">
                <el-button size="medium" type="primary" @click="clearmodeEditClick">确 定</el-button>
              </div>
            </el-dialog>
            <div class="lineText">
              <span class="label">T+0到账</span>
              <span class="value">{{infor.supportT0 | supportT0State}}</span>
            </div>
            <div class="lineText">
              <span class="label">渠道类型</span>
              <!--infor.paychannels-->
              <span class="value">
                <div v-if="infor.paychannels==='01' || infor.paychannels==='01,02'">
                  <span class="width80 left">支付宝</span>T+1费率：{{infor.signup.aliratesT1}}&#x3000;T+0费率：{{infor.signup.aliratesT0}}</div>
                <br/>
                <div v-if="infor.paychannels==='02' || infor.paychannels==='01,02'">
                  <span class="width80 left">微信支付</span>T+1费率：{{infor.signup.wechatratesT1}}&#x3000;T+0费率：{{infor.signup.wechatratesT0}}</div>
              </span>
            </div>
            <div class="lineText">
              <span class="label">交易类型</span>
              <span class="value">{{tradetypesStr}}</span>
              <i v-if="status===statusNormal && infor.isaudit === 5" class="iconfont icon-bianji-copy ml10 fontSizeM" @click="showEditDealTypeEvent=true"></i>
              <el-dialog width="40%" title="编辑交易类型" :visible.sync="showEditDealTypeEvent">
                <div class="contentTextForRow">
                  <div class="contentTextL">交易类型</div>
                  <div class="contentTextR">
                    <el-checkbox-group v-model="tradetypes">
                      <div v-for="(value, key) in payType" :key="key">
                        <el-checkbox :label="key">{{value}}</el-checkbox>
                      </div>
                    </el-checkbox-group>
                  </div>
                </div>
                <div slot="footer" class="dialog-footer">
                  <el-button size="medium" type="primary" @click="tradetypesEditClick">确 定</el-button>
                </div>
              </el-dialog>
            </div>
            <div class="lineText">
              <span class="label">禁用支付方式</span>
              <span class="value">{{infor.deniedpays | deniedpaysState}}</span>
              <i v-if="status===statusNormal && infor.isaudit === 5" class="iconfont icon-bianji-copy ml10 fontSizeM" @click="showEditForbiddenMethodEvent=true"></i>
              <el-dialog style="editDialog" width="500px" title="编辑禁用支付方式" :visible.sync="showEditForbiddenMethodEvent">
                <div>
                  <span>禁用支付方式</span>
                  <el-checkbox-group v-model="deniedpays">
                    <span>
                      <el-checkbox label="03" key="1" @change="change1">禁用花呗（支付宝）</el-checkbox>
                    </span>
                    <span>
                      <el-checkbox label="02" key="2">禁用信用卡（微信支付刷卡支付（被扫）模式无法禁用信用卡支付）</el-checkbox>
                    </span>
                  </el-checkbox-group>
                  <br>
                </div>
                <div v-if="isDisabledHB">
                  <el-checkbox v-model="supportStage" @change="supportStageClick">买家不可使用(花呗分期)
                  </el-checkbox>
                </div>
                <div slot="footer" class="dialog-footer">
                  <el-button size="medium" type="primary" @click="deniedpaysEditClick">确 定</el-button>
                </div>
              </el-dialog>
            </div>
            <div class="lineText">
              <span class="label">花呗分期</span>
              <span class="value">{{infor.supportStage | supportStageState}}</span>
            </div>
          </div>
        </div>
        <div class="infoBox" v-if="infor.isaudit !== 1 && infor.isaudit !== 4 && infor.isaudit !== 7 && infor.isaudit !== 2 && infor.isaudit !== 6">
          <div class="title">微信公众号</div>
          <div class="contentText">
            <div class="lineText">
              <span class="label">公众号类型</span>
              <span class="value">{{infor.publicNumType | publicNumTypeState}}</span>
            </div>
            <div class="lineText" v-if="infor.isaudit !== 5 && infor.isaudit !== 8">
              <span class="label">公众号商户号</span>
              <span class="value">{{infor.subscribeMerchId}}</span>
            </div>
            <div class="lineText">
              <span class="label">公众号授权目录</span>
              <span class="value">{{infor.publicPath}}</span>
            </div>
            <div class="lineText" v-if="infor.isaudit !== 5 && infor.isaudit !== 8">
              <span class="label">APPid（用于微信支付）</span>
              <span class="value">{{infor.wxPid}}</span>
            </div>
            <div class="lineText">
              <span class="label">APPid（用于微信关注）</span>
              <span class="value">{{infor.subscribeAppId}}</span>
            </div>
          </div>
        </div>
        <div class="infoBox">
          <div class="title">签署的协议</div>
          <div class="contentText">
            <div class="lineText">
              <a>《臻收银商户注册服务协议》、《臻收银服务隐私政策条款》、《移动支付收单服务协议》、《网商银行账户服务协议》、《余利宝服务协议》</a>
            </div>
          </div>
        </div>
        <div class="infoBox" v-if="infor.isaudit !== 1">
          <div class="title">审核信息</div>
          <div class="contentText">
            <div class="lineText">
              <span class="label">申请时间</span>
              <span class="value">{{infor.created | format}}</span>
            </div>
            <div class="lineText" v-if="infor.isaudit !== 1 && infor.merchanttype !==3 && infor.isaudit !== 4 && infor.isaudit !== 7 && infor.isaudit !== 2 && infor.isaudit !== 6">
              <span class="label">审核时间</span>
              <span class="value">{{infor.updated | format}}</span>
            </div>
            <div class="lineText" v-if="infor.isaudit !== 1 && infor.merchanttype !==3 && infor.isaudit !== 4 && infor.isaudit !== 7 && infor.isaudit !== 2 && infor.isaudit !== 6">
              <span class="label">审核人</span>
              <span class="value">{{infor.operatorname}}</span>
            </div>
          </div>
        </div>
        <div class="infoBox mb20">
          <div class="title">备忘信息</div>
          <div class="contentText mtb10">
            <el-table :data="tableData" stripe>
              <el-table-column prop="created" label="时间" width="180" :formatter="formatTable"></el-table-column>
              <el-table-column prop="operatorname" label="负责人" width="120"></el-table-column>
              <el-table-column prop="memoStatus" label="状态" width="100" :formatter="memoStatusType"></el-table-column>
              <el-table-column prop="memoContent" label="备忘信息" width="200" show-overflow-tooltip=""></el-table-column>
            </el-table>
            <el-button size="medium" class="btn mt10" @click="memoDialog">备忘</el-button>
            <el-dialog width="40%" title="备忘" :visible.sync="showMemoType">
              <div class="element">
                <p class="width100 textLeft inline">状态：</p>
                <div class="inline">
                  <el-select size="medium" placeholder="请选择" v-model="memoStatus">
                    <el-option v-for="(item, index) in memoList" :key="index" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </div>
              </div>
              <div class="element">
                <p class="width100 textLeft inline">备忘：</p>
                <div class="inline">
                  <textarea class="inline-textarea" v-model="memoContent"></textarea>
                </div>
              </div>
              <div slot="footer" class="dialog-footer">
                <el-button size="medium" type="primary" @click="sureAddMemo">确定</el-button>
              </div>
            </el-dialog>
            <el-button size="medium" class="btn mt10" @click="intoCheck" v-if="(checks.length === 0 && type) ? true : false">下一步</el-button>
            <el-button size="medium" class="btn mt10" @click="centerDialogVisible = true" v-if="checks.length !== 0 ? true : false">审核驳回</el-button>
            <el-dialog title="提示" :visible.sync="centerDialogVisible" width="30%" center>
              <span>确认审核驳回?</span>
              <span slot="footer" class="dialog-footer">
                <el-button @click="centerDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="checkGoout">确 定</el-button>
              </span>
            </el-dialog>
          </div>
        </div>
      </div>
    </el-checkbox-group>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
import { manageTypeList, runTYpeList1, memoList } from 'common/js/config'
import { format } from 'common/js/times'
import { getCurrentRow, getUserId, saveDetailInfo } from 'common/js/cache'
import { Loading } from 'element-ui'
import {
  shopEdit,
  customerDetails,
  customerDetailsEdit,
  auditFail,
  updateAbbreviation,
  updateOperatetype,
  updateOperatecategory,
  updateServicePhone,
  updateDeniedpays,
  updateTradetypes,
  updateCustomerClearmode,
  sendMsgCode,
  changePhone,
  bankList,
  updateBanknumbe,
  listBranchBank,
  updateImg,
  zsPToken,
  queryMybankAuditState,
  save,
  listByCustomerId
} from '@/api/index'

export default {
  data() {
    return {
      autidId: getUserId(),
      type: false,
      isaudit: null,
      CardDialogVisible: false,
      checks: [],
      beiwang: [
        {
          date: '2017-01-08 20:18:56',
          name: '周润发',
          word: '这里是备忘信息'
        }, {
          date: '2017-01-08 20:18:56',
          name: '周润发2',
          word: '这里是备忘信息2'
        }, {
          date: '2017-01-08 20:18:56',
          name: '周润发2',
          word: '这里是备忘信息2'
        }],
      infor: {},
      listIndentity: [{
        src: '',
        w: 600,
        h: 400
      }, {
        src: '',
        w: 600,
        h: 400
      }, {
        src: '',
        w: 600,
        h: 400
      }, {
        src: '',
        w: 600,
        h: 400
      }, {
        src: '',
        w: 600,
        h: 400
      }],
      bank: '',
      payType: {
        '01': '正扫交易',
        '02': '反扫交易',
        '06': '退款交易',
        '08': '动态订单交易'
      },
      banksList: [
        {
          value: '0',
          label: '全部'
        }, {
          value: '1',
          label: '工商银行'
        }
      ],
      status: 2, // 1：待审核、驳回 2：正常情况
      statusNormal: 2,
      showEditBankEdit: false,
      showEditMobile: false,
      showEditStoreName: false,
      showEditServicePhone: false,
      showEditManageType: false,
      showEditManageClass: false,
      showEditStoreAddress: false,
      showEditForbiddenMethodEvent: false,
      showEditDealTypeEvent: false,
      showEditMoneyEvent: false,
      centerDialogVisible: false,
      imgdialogVisible: false,
      showMemoType: false,
      creditCard: false,
      imgs: {
        // img1: '', // 营业执照
        // img2: '', // 法人身份证正面
        // img3: '', // 法人身份证反面
        // img4: '', // 门头照
        // img5: '', // 组织机构代码证
        // img6: '' // 开户许可证
      },
      customerid: null,
      manageTypeList: manageTypeList,
      runTYpeList1: runTYpeList1,
      abbreviation: '',
      operatetype: '',
      operatecategory: '',
      servicephone: '',
      newObj: {},
      checked: false,
      memoList: memoList,
      errorMsgs: [],
      errorFlags: [],
      errorKeys: [],
      journeys: [],
      publicNumType: '',
      deniedpays: ['03', '02'],
      supportStageValue: '02',
      tradetypes: [],
      tradetypesStr: '',
      isDisabledHB: 0,
      isDisabledHB2: 1,
      isDisabledHB3: 1,
      isDisabledHB4: true,
      supportAli: false,
      supportWechat: false,
      loading: false,
      aliratesT0: 0.38,
      aliratesT1: 0.38,
      wechatratesT0: 0.38,
      wechatratesT1: 0.38,
      supportAliValue: 1,
      supportWechatValue: 1,
      oldMsgCode: '',
      newMsgCode: '',
      newPhone: '',
      banks: [{ bankid: "", bankname: "" }],
      newbanknumbe: '',
      bankSearchList: [],
      subBank: null,
      pageSize: 10,
      pageIndex: 1,
      imgDialogData: {},
      uploadImg: {
        token: '',
        key: ''
      },
      newUserid: '',
      memoStatus: '',
      memoContent: '',
      tableData: [],
      clearmode: ''
    }
  },
  filters: {
    nullToLine(value) {
      return (value === '' || value === null || value === 'null') ? '---' : value
    },
    format(value) {
      return format(value)
    },
    openClose(value) {
      return value === 1 ? '启用' : value === 0 ? '禁用' : '---'
    },
    merchanttypeState(value) {
      return value === 1 ? '个体工商户' : value === 2 ? '自然人' : value === 3 ? '企业商户' : '---'
    },
    manageTypeState(value) {
      return value === 1 ? '仅有实体店' : value === 2 ? '仅有网络渠道' : value === 3 ? '实体兼网络渠道' : '---'
    },
    manageType2State(value) {
      return value === 1 ? '美食' : value === 2 ? '超市便利店' : value === 3 ? '休闲娱乐' : value === 4 ? '购物' : value === 5 ? '爱车' : value === 6 ? '生活服务' : value === 7 ? '教育培训' : value === 8 ? '医疗健康' : value === 9 ? '航旅' : value === 10 ? '专业销售/批发' : value === 11 ? '政府/社会组织' : '---'
    },
    clearmodeState(value) {
      return value === 1 ? '结算到银行卡' : value === 2 ? '结算到余利宝' : '---'
    },
    accounttypeState(value) {
      return value === 1 ? '对公' : value === 2 ? '对私' : '---'
    },
    supportT0State(value) {
      return value === 1 ? '支持' : value === 2 ? '不支持' : '---'
    },
    supportStageState(value) {
      return value === '01' ? '支持' : value === '02' ? '不支持' : '---'
    },
    publicNumTypeState(value) {
      return value === 1 ? '合作机构公众号（捷信安保公众号）' : value === 2 ? '商户自有公众号' : value === 3 ? '其他商户公众号' : '---'
    },
    deniedpaysState(value) {
      if (value) {
        if (value.indexOf('02') > -1 && value.indexOf('03') > -1) {
          return '禁用花呗（支付宝），禁用信用卡（微信支付刷卡支付（被扫）模式无法禁用信用卡支付）'
        } else if (value.indexOf('03') > -1) {
          return '禁用花呗（支付宝）'
        } else if (value.indexOf('02') > -1) {
          return '禁用信用卡（微信支付刷卡支付（被扫）模式无法禁用信用卡支付）'
        }
      }
      return value
    },
    bankState(value) {
      return value === 1 ? '中国建设银行' : value === 2 ? '中国农业银行' : value === 3 ? '中国银行' : value === 4 ? '中国工商银行' : value === 5 ? '中国邮政储蓄银行' : value === 6 ? '交通银行' : value === 7 ? '光大银行' : value === 8 ? '兴业银行' : value === 9 ? '民生银行' : value === 10 ? '招商银行' : value === 11 ? '中信银行' : '---'
    }
  },
  computed: {},
  created() {
    console.log('this.autidId:')
    console.log(this.autidId)
    this.customerid = parseInt(this.$route.query.customerid);
    this.type = this.$route.query.type === 'true' ? 1 : 0
    // // console.log(`this.type:${this.type}`)
    if (this.customerid) {
      this.search(this.customerid)
      this.bankListT();
      this.listByMemo();
    }
    // this.row = getCurrentRow()
  },
  methods: {
    formatTable(row, col, val) {
      return format(row.created)
    },
    previewIndentity(index) {
      this.$preview.open(index, this.listIndentity)
    },
    editImgClick() {
      this.imgdialogVisible = true
    },
    editImgClickYes() {
      let params = {
        customerid: this.customerid,
        imageId: this.imgDialogData.imageId,
        imageType: this.imgDialogData.imageType,
        path: this.imgDialogData.path
      }
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      updateImg(params).then(res => {
        if (res.code === 200) {
          this.$message({
            type: 'success',
            message: `修改成功`
          })
          this.search(this.customerid)
        } else {
          this.$message({
            type: 'fail',
            message: `修改失败：${res.data.msg}`
          })
        }
        this.CardDialogVisible = false
        loading.close();
        // this.newObj['images' + this.imgDialogData.imgType].path = this.imgDialogData.path;
      })
    },
    handleClose() {

    },
    openImgdialog(opt) {
      this.CardDialogVisible = true;
      this.imgDialogData = Object.assign({}, this.newObj['images' + opt.type]);
    },
    handleAvatarSuccess(res, file) {
      // qiniujiexino2opublic.51icare.cn
      // this.newObj['images' + this.imgDialogData.imgType].path = 'http://qiniujiexino2opublic.51icare.cn/' + res.key
      this.imgDialogData.path = 'http://qiniujiexino2opublic.51icare.cn/' + res.key
    },
    async beforeAvatarUpload(file) {
      let data = await zsPToken()
      this.uploadImg.key = 'zsy/' + new Date().getTime() + file.name
      this.uploadImg.token = data.result
      console.log('this.uploadImg.token:')
      console.log(this.uploadImg.token)
    },
    change1(val) {
      if (val) {
        this.isDisabledHB = false
        this.supportStage = false
        this.supportStageValue = '02'
      } else {
        this.isDisabledHB = true
        this.supportStage = true
        this.supportStageValue = '01'
      }
    },
    queryMybankState() {
      let params = {}
      queryMybankAuditState(params).then(res => {
        this.callFun(res)
      }).catch(res => {
        this.callFun(res)
      })
    },
    checksEvent(val) {
      for (let item in this.newObj) {
        let key = this.newObj[item].key;
        let ischeck = false;
        for (let i = 0; i < val.length; i++) {
          key === val[i].key ? ischeck = true : '';
        }
        ischeck ? this.newObj[item].check = true : this.newObj[item].check = false
      }
      // // console.log(val);
    },
    async search(customerid) {
      console.log('intoSearch')
      let params = {
        customerid: customerid
      }
      console.log('intoSearch===0')
      this.infor = (await customerDetails(params)).result
      console.log('intoSearch===1')
      if (this.infor.images.length > 0) {
        // this.imgs = [...this.infor.images]
        this.imgs = this.infor.images
        console.log(`imgs>0=${this.imgs.length}:`)
        console.log(this.imgs)
        // imageType 图片类型(1：营业执照 2：身份证正面 3：身份证反面 4：门头照 5：组织机构代码证 6：开户许可证)
        for (let i = 0; i < this.imgs.length; i++) {
          if ((this.imgs[i].path !== null || this.imgs[i].path !== 'null') && this.imgs[i].imageType === 2) {
            this.listIndentity[0].src = this.imgs[i].path// 身份证正面
            this.listIndentity[0].imageType = this.imgs[i].imageType
          } else if ((this.imgs[i].path !== null || this.imgs[i].path !== 'null') && this.imgs[i].imageType === 3) {
            this.listIndentity[1].src = this.imgs[i].path// 身份证反面
            this.listIndentity[1].imageType = this.imgs[i].imageType
          } else if ((this.imgs[i].path !== null || this.imgs[i].path !== 'null') && this.imgs[i].imageType === 1) {
            this.listIndentity[2].src = this.imgs[i].path// 营业执照
            this.listIndentity[2].imageType = this.imgs[i].imageType
          } else if ((this.imgs[i].path !== null || this.imgs[i].path !== 'null') && this.imgs[i].imageType === 6) {
            this.listIndentity[3].src = this.imgs[i].path// 开户许可证
            this.listIndentity[3].imageType = this.imgs[i].imageType
          } else if ((this.imgs[i].path !== null || this.imgs[i].path !== 'null') && this.imgs[i].imageType === 4) {
            this.listIndentity[4].src = this.imgs[i].path// 门头照
            this.listIndentity[4].imageType = this.imgs[i].imageType
          }
        }
      }

      this.phone = this.infor.phone;
      this.supportT0 = this.infor.supportT0 ? this.infor.supportT0 : 2;
      this.clearmode = this.infor.clearmode === 2 ? 1 : 0;
      this.publicNumType = this.infor.publicNumType
      this.infor.tradetypes ? this.tradetypes = this.infor.tradetypes.split(',') : this.tradetypes = []
      this.tradetypesStr = this.payTypeToString(this.tradetypes)
      this.infor.deniedpays ? this.deniedpays = this.infor.deniedpays.split(',') : this.deniedpays = []

      for (let i = 0; i < this.imgs.length; i++) {
        var keyname = 'images' + this.imgs[i].imageType;
        this.$set(this.newObj, keyname, {
          key: keyname,
          path: this.imgs[i].path,
          imageType: this.imgs[i].imageType,
          check: false,
          errorText: '',
          imageId: this.imgs[i].imageId
        })
      }
      // delete this.infor.images

      for (let item in this.infor) {
        this.$set(this.newObj, item, {
          key: item,
          value: this.infor[item],
          check: false,
          errorText: ''
        })
      }
      // // console.log(this.newObj);
    },
    // 开户行模糊搜索
    subBankClick(value) {
      if (value === '') {
        this.bankSearchList = [];
        return
      }
      let params = {
        bankname: value,
        pageSize: this.pageSize,
        pageIndex: this.pageIndex
      }
      listBranchBank(params).then(res => {
        this.bankSearchList = res.result
      }).catch(res => {
      })
    },
    checkChange(val) {
      this.newObj.merchantname.check = val;
      // // console.log(val, this.newObj.merchantname)
    },
    // 编辑回调
    callFun(opts) {
      if (opts.code === 200) {
        this.$message({
          type: 'success',
          message: `修改成功`
        })
      } else {
        this.$message({
          type: 'fail',
          message: `修改失败`
        })
      }
    },
    // 商户简称编辑
    abbreviationClick() {
      let params = {
        customerid: this.customerid,
        abbreviation: this.abbreviation
      }
      updateAbbreviation(params).then(res => {
        this.callFun(res)
        this.showEditStoreName = false
        this.search(this.customerid)
      }).catch(res => {
        this.callFun(res)
      })
    },
    // 经营类型编辑
    operatetypeClick() {
      let params = {
        customerid: this.customerid,
        operatetype: this.operatetype
      }
      updateOperatetype(params).then(res => {
        this.callFun(res)
        this.showEditManageType = false
        this.search(this.customerid)
      }).catch(res => {
        this.callFun(res)
      })
    },
    // 经营类目编辑
    operatecategoryClick() {
      let params = {
        customerid: this.customerid,
        operatecategory: this.operatecategory
      }
      updateOperatecategory(params).then(res => {
        this.callFun(res)
        this.showEditManageClass = false
        this.search(this.customerid)
      }).catch(res => {
        this.callFun(res)
      })
    },
    // 客服电话编辑
    servicephoneClick() {
      let params = {
        customerid: this.customerid,
        servicephone: this.servicephone

      }
      updateServicePhone(params).then(res => {
        this.callFun(res)
        this.showEditServicePhone = false
        this.search(this.customerid)
      }).catch(res => {
        this.callFun(res)
      })
    },
    // 花呗框选择
    supportStageClick(val) {
      if (val) {
        this.supportStageValue = 'Y'
      } else {
        this.supportStageValue = 'N'
      }
    },
    // 禁用方式编辑
    deniedpaysEditClick() {
      let params = {
        customerid: this.customerid,
        deniedpays: this.deniedpays.toString(),
        supportStage: this.supportStageValue
      }
      updateDeniedpays(params).then(res => {
        this.showEditForbiddenMethodEvent = false
        this.search(this.customerid)
        this.callFun(res)
      }).catch(res => {
        this.showEditForbiddenMethodEvent = false
        this.callFun(res)
      })
    },
    // 费率编辑
    clearmodeEditClick() {
      let params = {
        customerid: this.customerid,
        supportT0: this.supportT0,
        supportAli: parseInt(this.supportAliValue),
        supportWechat: parseInt(this.supportWechatValue),
        aliratesT0: this.aliratesT0.length !== 0 ? this.aliratesT0 / 100 : '',
        aliratesT1: this.aliratesT1.length !== 0 ? this.aliratesT1 / 100 : '',
        wechatratesT0: this.wechatratesT0.length !== 0 ? this.wechatratesT0 / 100 : '',
        wechatratesT1: this.wechatratesT1.length !== 0 ? this.wechatratesT1 / 100 : ''
      }
      updateCustomerClearmode(params).then(res => {
        this.showEditMoneyEvent = false
        this.search(this.customerid)
        this.callFun(res)
      }).catch(res => {
        this.showEditMoneyEvent = false
        this.callFun(res)
      })
    },
    T0Click(val) {
      // // console.log(val)
      // // console.log('val.this.supportT0：' + this.supportT0)
      if (val) {
        this.isDisabledHB4 = true
        this.supportT0 = '1'
      } else {
        this.isDisabledHB4 = false
        this.supportT0 = '2'
        this.aliratesT0 = ''
        this.wechatratesT0 = ''
      }
    },
    supportAliClick(val) {
      this.supportAli = val
      // // console.log('this.supportAli:' + this.supportAli)
      if (this.supportAli === true) {
        this.supportAliValue = 1
        this.isDisabledHB2 = true
        this.aliratesT1 = this.aliratesT1
        this.aliratesT0 = this.aliratesT0
        // // console.log('this.supportAli1111111:' + this.supportAli)
      } else {
        this.supportAliValue = 2
        this.isDisabledHB2 = false
        this.aliratesT1 = ''
        this.aliratesT0 = ''
        // // console.log('this.supportAli222222:' + this.supportAli)
      }
    },
    supportWechatClick(val) {
      this.supportWechat = val
      if (this.supportWechat === true) {
        this.supportWechatValue = 1
        this.isDisabledHB3 = true
        this.wechatratesT1 = this.wechatratesT1
        this.wechatratesT0 = this.wechatratesT0
      } else {
        this.supportWechatValue = 2
        this.isDisabledHB3 = false
        this.wechatratesT1 = ''
        this.wechatratesT0 = ''
      }
    },
    payTypeToString(val) {
      var _str = []
      for (let n in val) {
        _str.push(this.payType[val[n]])
      }
      return _str.length === 0 ? '' : _str.join('，')
    },
    // 交易类型编辑
    tradetypesEditClick() {
      let params = {
        customerid: this.customerid,
        tradetypes: this.tradetypes.length === 0 ? '' : this.tradetypes.toString()
      }
      updateTradetypes(params).then(res => {
        this.showEditDealTypeEvent = false
        this.search(this.customerid)
        this.callFun(res)
      }).catch(res => {
        this.showEditDealTypeEvent = false
        this.callFun(res)
      })
    },
    // 负责人手机号码发送验证码
    getOldPhoneCode() {
      if (this.newPhone === '') {
        this.$message({
          message: `请填写新手机号`
        })
        return
      }
      let params = {
        customerid: this.customerid,
        sign: 'aXU5JSUzekV2b2U4UWF0R3UhV3haSmlHNDh4ZkZqNEt0SmtyMjJ0OUl5JU54V08wJUJ0VzliZFFVcFdjcXZZNDFEeHVQT2xIV15pVyVpKldoZG8wSSU2aUhG',
        phone: this.newPhone,
        bizType: '03'
      }
      sendMsgCode(params).then(res => {
        if (res.code === 200) {
          this.$message({
            type: 'success',
            message: `发送验证码成功`
          })
        }
      }).catch(res => {
        this.$message({
          type: 'fail',
          message: `发送验证码失败`
        })
      })
    },
    phoneEditClick() {
      if (this.oldMsgCode === '') {
        this.$message({
          message: `请填写原手机号验证码`
        })
        return
      }
      if (this.newMsgCode === '') {
        this.$message({
          // type: 'success',
          message: `请填写新手机号验证码`
        })
        return
      }
      let params = {
        customerid: this.customerid,
        oldMsgCode: this.oldMsgCode,
        newPhone: this.newPhone,
        newMsgCode: this.newMsgCode
      }
      changePhone(params).then(res => {
        this.callFun(res)
        this.showEditManageClass = false
        this.search(this.customerid)
      }).catch(res => {
        this.callFun(res)
      })
    },
    // 开户行列表
    bankListT() {
      let params = {}
      bankList(params).then(res => {
        // // console.log(res.result)
        this.banks = res.result;
      }).catch(res => {
      })
    },
    // 提现银行卡编辑
    bankCardEdit() {
      if (this.infor.accounttype === 1) {
        if (this.subBank === '') {
          this.$message({
            message: `请填写开户支行`
          })
          return
        }
        if (this.newbanknumbe === '') {
          this.$message({
            // type: 'success',
            message: `请填写对公账号`
          })
          return
        }
      } else if (this.infor.accounttype === 2) {
        if (this.bank === '') {
          this.$message({
            message: `请选择开户行`
          })
          return
        }
        if (this.newbanknumbe === '') {
          this.$message({
            message: `请填写银行卡号`
          })
          return
        }
      }
      let params = {
        customerid: this.customerid,
        banknumbe: this.newbanknumbe,
        bank: this.bank,
        subBank: this.subBank,
        msgCode: this.msgCode
      }
      updateBanknumbe(params).then(res => {
        this.callFun(res)
        this.showEditStoreName = false
      }).catch(res => {
        this.callFun(res)
      })
    },
    editBankCard() {
      this.showEditBankEdit = true
    },
    // 备忘
    memoDialog() {
      this.showMemoType = true
      this.memoStatus = ''
      this.memoContent = ''
    },
    sureAddMemo() {
      if (this.memoStatus === '') {
        this.$message({
          message: `请选择状态`
        })
        return
      }
      if (this.memoContent === '') {
        this.$message({
          message: `请输入备忘内容`
        })
        return
      }
      let params = {
        customerid: this.customerid,
        memoStatus: this.memoStatus,
        memoContent: this.memoContent
      }
      save(params).then(res => {
        this.showMemoType = false
        if (res.code === 200) {
          this.$message({
            type: 'success',
            message: `备忘成功`
          })
          this.listByMemo()
        } else {
          this.$message({
            type: 'fail',
            message: `系统出错：${res.msg}`
          })
        }
      }).catch(res => {
        this.callFun(res)
      })
    },
    // 备忘列表
    listByMemo() {
      let params = {
        customerid: this.customerid
      }
      listByCustomerId(params).then(res => {
        this.tableData = res.result
      })
    },
    // 审核驳回
    checkGoout() {
      this.errorMsgs = [];
      this.errorFlags = [];
      this.errorKeys = [];
      this.journeys = [];
      this.imgTypes = [];
      // // console.log(this.checks);
      for (let i = 0; i < this.checks.length; i++) {
        if (this.checks[i].check) {
          this.journeys.push(this.checks[i].journeys);
          this.errorMsgs.push(this.checks[i].errorText);
          this.errorFlags.push(this.checks[i].errorFlags);
          this.imgTypes.push(this.checks[i].imgTypes);
          if (this.checks[i].imageId) {
            this.errorKeys.push(this.checks[i].imageId);
          } else {
            this.errorKeys.push(this.checks[i].key);
          }
        }
      }
      // // console.log(this.errorMsgs, this.errorFlags, this.errorKeys, this.journeys);
      let params = {
        customerid: this.customerid,
        autidId: this.autidId,
        journeys: JSON.stringify(this.journeys),
        errorMsgs: JSON.stringify(this.errorMsgs),
        errorFlags: JSON.stringify(this.errorFlags),// 0:图片 1:文字
        imgTypes: JSON.stringify(this.errorFlags === 1 ? 0 : this.imgTypes),// 审核出错图片类型集合（图片为图片类型，文字为0）
        errorKeys: JSON.stringify(this.errorKeys),
        phone: this.phone
      }
      auditFail(params).then(res => {
        console.log(params)
        if (res.code === 200) {
          this.centerDialogVisible = false
          this.$message({
            type: 'success',
            message: `操作成功！`
          })
        } else {
          this.$message({
            type: 'fail',
            message: `系统出错：${res.msg}`
          })
        }
      })
    },
    intoCheck() {
      if (this.clearmode === 1) {
        this.clearmode = 2
      } else {
        this.clearmode = 1
      }
      let initState = false;
      this.errorMsgs = [];
      this.errorFlags = [];
      this.errorKeys = [];
      this.journeys = [];
      // // console.log(this.checks);
      for (let i = 0; i < this.checks.length; i++) {
        if (this.checks[i].check) {
          this.journeys.push(this.checks[i].journeys);
          this.errorMsgs.push(this.checks[i].errorText);
          this.errorFlags.push(this.checks[i].errorFlags);
          if (this.checks[i].imageId) {
            this.errorKeys.push(this.checks[i].imageId);
          } else {
            this.errorKeys.push(this.checks[i].key);
          }
        }
      }
      // // console.log(this.errorMsgs, this.errorFlags, this.errorKeys, this.journeys);
      if (!initState) {
        let params = {
          supportT0: this.supportT0,
          customerid: this.customerid,
          autidId: this.autidId,
          phone: this.phone,
          clearmode: this.clearmode,
          publicNumType: this.publicNumType,// 公众号类型
          applyTime: this.infor.created,
          isaudit: this.infor.isaudit
        }
        saveDetailInfo(params)
        this.$router.push('/merchantManage/check')
      }
    },
    // 备忘状态过滤
    memoStatusType: function(row, column) {
      let type = '---';
      switch (row.memoStatus) { // 三种情况
        case 1:
          type = '已联系上';
          break;
        case 2:
          type = '未联系上';
          break;
        case 3:
          type = '黑名单';
          break;
      }
      return type;
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
@import './detail.scss'
</style>
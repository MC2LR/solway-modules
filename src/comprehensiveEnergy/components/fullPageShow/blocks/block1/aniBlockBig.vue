<template>
    <div class="view-con clearfix">
        <img src="./img/generalView1920.png" alt="能源概览分布图" class="general-big-view">
        <i class="iconfont iconjiantou- arrow11"></i>
        <i class="iconfont iconjiantou- arrow12"></i>
        <i class="iconfont iconjiantou- arrow21"></i>
        <i class="iconfont iconjiantou- arrow22"></i>
        <i class="iconfont iconjiantou- arrow31"></i>
        <i class="iconfont iconjiantou- arrow32"></i>
        <i class="iconfont iconjiantou- arrow41"></i>
        <i class="iconfont iconjiantou- arrow42"></i>
        <i class="iconfont iconjiantou- arrow51"></i>
        <i class="iconfont iconjiantou- arrow52"></i>
        <i class="iconfont iconjiantou- arrow61"></i>
        <i class="iconfont iconjiantou- arrow62"></i>
    </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
@keyframes arrow1
{
    0%    { right: 207px; top: 39px; transform: rotate(52deg); opacity: 1; }
    20%   { right: 175px; top: 22px; transform: rotate(52deg); opacity: 1; }
    21%   { right: 175px; top: 26px; transform: rotate(129deg); opacity: 1; }
    100%  { right: 78px; top: 89px; transform: rotate(129deg); opacity: 1; }
}
@keyframes arrow2
{
    0%    { right: 388px; top: 150px; transform: rotate(125deg); opacity: 1; }
    20%   { right: 325px; top: 194px; transform: rotate(125deg); opacity: 1; }
    21%   { right: 325px; top: 194px; transform: rotate(55deg); opacity: 1; }
    82%   { right: 158px; top: 85px; transform: rotate(55deg); opacity: 1; }
    83%   { right: 158px; top: 87px; transform: rotate(127deg); opacity: 1; }
    100%  { right: 111px; top: 122px; transform: rotate(127deg); opacity: 1; }
}
@keyframes arrow3
{
    0%    { right: 394px; top: 154px; transform: rotate(125deg); opacity: 1; }
    20%   { right: 326px; top: 202px; transform: rotate(125deg); opacity: 1; }
    21%   { right: 326px; top: 202px; transform: rotate(55deg); opacity: 1; }
    82%   { right: 160px; top: 95px; transform: rotate(55deg); opacity: 1; }
    83%   { right: 160px; top: 95px; transform: rotate(127deg); opacity: 1;}
    100%  { right: 115px; top: 126px; transform: rotate(127deg); opacity: 1; }
}
@keyframes arrow4
{
    0%    { right: 400px; top: 158px; transform: rotate(125deg); opacity: 1; }
    20%   { right: 326px; top: 211px; transform: rotate(125deg); opacity: 1; }
    21%   { right: 326px; top: 211px; transform: rotate(55deg); opacity: 1; }
    82%   { right: 161px; top: 100px; transform: rotate(55deg); opacity: 1; }
    83%   { right: 161px; top: 100px; transform: rotate(127deg); opacity: 1; }
    100%  { right: 123px; top: 128px; transform: rotate(127deg); opacity: 1; }
}
@keyframes arrow5
{
    0%    { right: 213px; top: 235px; transform: rotate(125deg); opacity: 1; }
    20%   { right: 175px; top: 261px; transform: rotate(125deg); opacity: 1; }
    21%   { right: 175px; top: 261px; transform: rotate(50deg); opacity: 1; }
    98%   { right: 23px; top: 157px; transform: rotate(55deg); opacity: 1; }
    100%  { right: 29px; top: 155px; transform: rotate(-55deg); opacity: 1; }
}
@keyframes arrow6
{
    0%    { right: 17px; top: 152px; transform: rotate(130deg); opacity: 1; }
    5%   { right: 6px; top: 160px; transform: rotate(130deg); opacity: 1; }
    6%   { right: 6px; top: 160px; transform: rotate(230deg); opacity: 1; }
    79%   { right: 176px; top: 274px; transform: rotate(230deg); opacity: 1; }
    80%   { right: 176px; top: 274px; transform: rotate(-50deg); opacity: 1; }
    100%  { right: 225px; top: 242px; transform: rotate(-50deg); opacity: 1; }

    // 0%    { right: 225px; top: 242px; transform: rotate(125deg); opacity: 1; }
    // 20%   { right: 176px; top: 274px; transform: rotate(125deg); opacity: 1; }
    // 21%   { right: 176px; top: 274px; transform: rotate(50deg); opacity: 1; }
    // 94%   { right: 6px; top: 160px; transform: rotate(230deg); opacity: 1; }
    // 95%   { right: 6px; top: 160px; transform: rotate(-50deg); opacity: 1; }
    // 100%  { right: 17px; top: 152px; transform: rotate(-50deg); opacity: 1; }
}

.view-con {
    width: max-content;
    height: max-content;
    position: relative;
    .general-big-view {
        float: left;
    }
    i.iconfont {
        font-size: 12px;
        color: #02f79a;
        display: inline-block;
        width: 12px;
        height: 12px;
        line-height: 12px;
        margin: auto;
        position: absolute;
    }
    .arrow11 {
        animation: arrow1 4s infinite linear;
    }
    .arrow12 {
        right: 207px; top: 39px; transform: rotate(52deg); opacity: 0;
        animation: arrow1 4s 2s infinite linear;
    }
    .arrow21 {
        animation: arrow2 6s infinite linear;
    }
    .arrow22 {
        right: 388px; top: 150px; transform: rotate(125deg); opacity: 0;
        animation: arrow2 6s 2s infinite linear;
    }
    .arrow31 {
        right: 394px; top: 154px; transform: rotate(125deg); opacity: 0;
        animation: arrow3 6s 1s infinite linear;
    }
    .arrow32 {
        right: 394px; top: 154px; transform: rotate(125deg); opacity: 0;
        animation: arrow3 6s 3s infinite linear;
    }
    .arrow41 {
        right: 400px; top: 158px; transform: rotate(125deg); opacity: 0;
        animation: arrow4 6s 2s infinite linear;
    }
    .arrow42 {
        right: 400px; top: 158px; transform: rotate(125deg); opacity: 0;
        animation: arrow4 6s 4s infinite linear;
    }
    .arrow51 {
        animation: arrow5 4s infinite linear;
    }
    .arrow52 {
        right: 213px; top: 235px; transform: rotate(125deg); opacity: 0;
        animation: arrow5 4s 2s infinite linear;
    }
    .arrow61 {
        animation: arrow6 4s infinite linear;
    }
    .arrow62 {
        right: 225px; top: 242px; transform: rotate(125deg); opacity: 0;
        animation: arrow6 4s 2s infinite linear;
    }
}
</style>

<template>
    <div class="view-con clearfix">
        <img src="./img/generalView1366.png" alt="能源概览分布图" class="general-big-view">
        <i class="comprehensive iconjiantou- arrow11"></i>
        <i class="comprehensive iconjiantou- arrow12"></i>
        <i class="comprehensive iconjiantou- arrow21"></i>
        <i class="comprehensive iconjiantou- arrow22"></i>
        <i class="comprehensive iconjiantou- arrow31"></i>
        <i class="comprehensive iconjiantou- arrow32"></i>
        <i class="comprehensive iconjiantou- arrow41"></i>
        <i class="comprehensive iconjiantou- arrow42"></i>
        <i class="comprehensive iconjiantou- arrow51"></i>
        <i class="comprehensive iconjiantou- arrow52"></i>
        <i class="comprehensive iconjiantou- arrow61"></i>
        <i class="comprehensive iconjiantou- arrow62"></i>
    </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
@keyframes arrow1
{
    0%    { right: 146px; top: 31px; transform: rotate(52deg); opacity: 1; }
    20%   { right: 127px; top: 18px; transform: rotate(52deg); opacity: 1; }
    21%   { right: 127px; top: 18px; transform: rotate(129deg); opacity: 1; }
    100%  { right: 56px; top: 65px; transform: rotate(129deg); opacity: 1; }
}
@keyframes arrow2
{
    0%    { right: 276px; top: 112px; transform: rotate(125deg); opacity: 1; }
    20%   { right: 231px; top: 142px; transform: rotate(125deg); opacity: 1; }
    21%   { right: 231px; top: 142px; transform: rotate(55deg); opacity: 1; }
    82%   { right: 112px; top: 65px; transform: rotate(55deg); opacity: 1; }
    83%   { right: 112px; top: 65px; transform: rotate(127deg); opacity: 1; }
    100%  { right: 80px; top: 88px; transform: rotate(127deg); opacity: 1; }
}
@keyframes arrow3
{
    0%    { right: 280px; top: 115px; transform: rotate(125deg); opacity: 1; }
    20%   { right: 231px; top: 148px; transform: rotate(125deg); opacity: 1; }
    21%   { right: 231px; top: 148px; transform: rotate(55deg); opacity: 1; }
    82%   { right: 112px; top: 70px; transform: rotate(55deg); opacity: 1; }
    83%   { right: 112px; top: 70px; transform: rotate(127deg); opacity: 1; }
    100%  { right: 84px; top: 91px; transform: rotate(127deg); opacity: 1; }
}
@keyframes arrow4
{
    0%    { right: 285px; top: 118px; transform: rotate(125deg); opacity: 1; }
    20%   { right: 234px; top: 154px; transform: rotate(125deg); opacity: 1; }
    21%   { right: 234px; top: 154px; transform: rotate(55deg); opacity: 1; }
    82%   { right: 111px; top: 75px; transform: rotate(55deg); opacity: 1; }
    83%   { right: 111px; top: 75px; transform: rotate(127deg); opacity: 1; }
    100%  { right: 87px; top: 94px; transform: rotate(127deg); opacity: 1; }
}
@keyframes arrow5
{
    0%    { right: 148px; top: 174px; transform: rotate(125deg); opacity: 1; }
    20%   { right: 123px; top: 191px; transform: rotate(125deg); opacity: 1; }
    21%   { right: 123px; top: 191px; transform: rotate(50deg); opacity: 1; }
    98%   { right: 14px; top: 116px; transform: rotate(55deg); opacity: 1; }
    100%  { right: 17px; top: 114px; transform: rotate(-55deg); opacity: 1; }
}
@keyframes arrow6
{
    0%    { right: 7px; top: 113px; transform: rotate(130deg);  opacity: 1; }
    5%   { right: 2px; top: 118px; transform: rotate(130deg); opacity: 1; }
    6%   { right: 2px; top: 118px; transform: rotate(230deg); opacity: 1; }
    79%   { right: 124px; top: 201px; transform: rotate(230deg); opacity: 1; }
    80%   { right: 124px; top: 201px; transform: rotate(-50deg); opacity: 1; }
    100%  { right: 157px; top: 179px; transform: rotate(-50deg); opacity: 1; }

    // 0%    { right: 157px; top: 179px; transform: rotate(125deg); opacity: 1; }
    // 20%   { right: 124px; top: 201px; transform: rotate(125deg); opacity: 1; }
    // 21%   { right: 124px; top: 201px; transform: rotate(50deg); opacity: 1; }
    // 94%   { right: 2px; top: 118px; transform: rotate(55deg); opacity: 1; }
    // 95%   { right: 2px; top: 118px; transform: rotate(-50deg); opacity: 1; }
    // 100%  { right: 7px; top: 113px; transform: rotate(-50deg); opacity: 1; }
}
.view-con {
    width: max-content;
    height: max-content;
    position: relative;
    .general-big-view {
        float: left;
    }
    i.comprehensive {
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
        animation: arrow1 3s infinite linear;
    }
    .arrow12 {
        right: 146px; top: 31px; transform: rotate(52deg); opacity: 0;
        animation: arrow1 3s 2s infinite linear;
    }
    .arrow21 {
        animation: arrow2 6s infinite linear;
    }
    .arrow22 {
        right: 276px; top: 112px; transform: rotate(125deg); opacity: 0;
        animation: arrow2 6s 2s infinite linear;
    }
    .arrow31 {
        right: 280px; top: 115px; transform: rotate(125deg); opacity: 0;
        animation: arrow3 6s 1s infinite linear;
    }
    .arrow32 {
        right: 280px; top: 115px; transform: rotate(125deg); opacity: 0;
        animation: arrow3 6s 3s infinite linear;
    }
    .arrow41 {
        right: 285px; top: 118px; transform: rotate(125deg); opacity: 0;
        animation: arrow4 6s 2s infinite linear;
    }
    .arrow42 {
        right: 285px; top: 118px; transform: rotate(125deg); opacity: 0;
        animation: arrow4 6s 4s infinite linear;
    }
    .arrow51 {
        animation: arrow5 4s infinite linear;
    }
    .arrow52 {
        right: 148px; top: 174px; transform: rotate(125deg); opacity: 0;
        animation: arrow5 4s 2s infinite linear;
    }
    .arrow61 {
        animation: arrow6 4s infinite linear;
    }
    .arrow62 {
        right: 157px; top: 179px; transform: rotate(125deg); opacity: 0;
        animation: arrow6 4s 2s infinite linear;
    }
}
</style>

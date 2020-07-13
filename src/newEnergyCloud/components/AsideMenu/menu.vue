<script>
import { Menu, MenuItem, MenuItemGroup, Submenu } from 'element-ui'
export default {
    props: ['backgroundColor', 'fontColor', 'activeColor'],
    components: {
        ElMenu: Menu,
        ElMenuItem: MenuItem,
        ElMenuItemGroup: MenuItemGroup,
        ElSubmenu: Submenu
    },
    computed: {
        menuList () {
            return this.$store.state.asideMenu.menuData
        },
        isCollapse () {
            return this.$store.state.asideMenu.isCollapse
        },
        comId () {
            return this.$store.getters.current_companyid
        }
    },
    methods: {
        menuItem (menu, index) {
            return menu.children ? (
                <el-submenu index={menu.children.map(v => (v.routeName || v.title)).join()}>
                    <template slot="title">
                        <i
                            style={{color: (menu.children[0].routeName === this.$route.name && !menu.children[0].title) ? this.activeColor : ''}}
                            onClick={() => this.openSubmenu(menu.children[0], menu.children.map(v => (v.routeName || v.title)).join())}
                            class={menu.icon.split(' ')}>
                        </i>
                        <span
                            style={{color: (menu.children[0].routeName === this.$route.name && !menu.children[0].title) ? this.activeColor : ''}}
                            onClick={() => this.openSubmenu(menu.children[0], menu.children.map(v => (v.routeName || v.title)).join())}>
                            {menu.title}
                        </span>
                    </template>
                    {menu.children.map(this.menuItem)}
                </el-submenu>
            ) : (
                    (menu.title && menu.routeName) ? (
                        <el-menu-item index={menu.index || menu.routeName} route={{
                            name: menu.moduleScope === process.env.name ? menu.routeName : (menu.moduleScope + ':' + menu.routeName),
                            params: {moduleScope: menu.moduleScope}
                        }} disabled={menu.disabled}>
                            <i class={menu.icon.split(' ')}></i>
                            <span slot="title">{menu.title}</span>
                        </el-menu-item>
                    ) : null
                )
        },
        openSubmenu (firstItem = {}, index) {
            if (firstItem.routeName !== this.$route.name && firstItem.routeName !== this.$route.query.path) {
                firstItem.routeName && !firstItem.title && this.$router.push({
                    name: firstItem.moduleScope === process.env.name ? firstItem.routeName : (firstItem.moduleScope + ':' + firstItem.routeName),
                    params: {moduleScope: firstItem.moduleScope}
                })
                this.closeSubmenu(index)
            }
        },
        async closeSubmenu (e, b, c) {
            const firstItem = e.split(',')[0]
            if (firstItem === this.$route.name || firstItem === this.$route.query.path) {
                await this.$timeout(100)
                this.$refs.menu && this.$refs.menu.open(e)
            }
        },
        goNewWindow () {
            window.open('http://114.112.96.222:9098/', '_blank')
        },
        cancelDefault (e) {
            this.goNewWindow()
            e.preventDefault()
            e.stopPropagation()
            return false
        }
    },
    render () {
        return (
            <el-menu
                ref="menu"
                collapse={this.isCollapse}
                collapse-transition={true}
                default-active={this.$store.state.asideMenu.menuIndex || this.$route.name}
                background-color={this.backgroundColor}
                text-color={this.fontColor}
                active-text-color={this.activeColor}
                router={true}>
                {this.menuList.map(this.menuItem)}
                {
                    (this.comId === 189)
                    ? (
                        <el-menu-item index="goOutPage" onClick={e => false}>
                            <i class="iconfont icon-back-copy"></i>
                            <span slot="title"><a onClick={this.cancelDefault} target="_blank" href="http://114.112.96.222:9098/">门禁系统</a></span>
                        </el-menu-item>
                    ) : null
                }
            </el-menu>
        )
    }
}
</script>
<style lang="scss" scoped>
.el-menu {
    border: none;

    &:not(.el-menu--collapse) {
        width: 160px;

        i.iconfont {
            font-size: 14px;
            margin-right: 0.5em;
            color: inherit;
        }
    }

    i.iconfont {
        color: inherit;
        font-size: 20px;
    }
}
</style>

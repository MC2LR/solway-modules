export default () => ('#' + ('00000' + Math.floor(Math.random() * 16777215).toString(16)).slice(-6))

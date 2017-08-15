export default {
    findAll: () => {
        return this.$http.get('/api/Blog');
    }
}
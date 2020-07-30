import moment from "moment";
import groupBy from "lodash/groupBy";
import sortBy from "lodash/sortBy";

const state = {
    notifications: {},
    grouped: {}
};

const mutations = {
    SET_NOTIFICATIONS(state, payload) {
        state.notifications = payload;
    },
    SET_GROUPED_NOTIFICATIONS(state, payload) {
        state.grouped = payload;
    }
};

const actions = {
    readAllNotification({ dispatch }) {
        axios({
            url: "/notifications-read-all",
            method: "POST"
        }).then(() => {
            dispatch("getNotifications");
        })
    },
    setGlobalData({ commit }, data) {
        commit("SET_RESOURCES", data.resources);
    },
    getNotifications({ commit, dispatch }) {
        axios({
            url: "/notifications",
            params: {
                format: true,
                q: "(is_deleted:0)",
                sort: "created_at|DESC"
            }
        }).then(({ data: notifications }) => {
            commit("SET_NOTIFICATIONS", notifications);
            dispatch("groupNotifications", notifications);
        }).catch(error => {
            console.error(error);
        })
    },
    groupNotifications({ dispatch }, notifications) {
        const groupedNotifications = groupBy(notifications.data, notification => {
            return moment(notification.created_at).format("YYYY-MM-DD");
        });
        dispatch("sortNotifications", groupedNotifications);
    },
    sortNotifications({ commit }, notifications) {
        Object.keys(notifications).forEach(dateKey => {
            notifications[dateKey] = sortBy(notifications[dateKey], ["created_at"], ["desc"]);
        });

        commit("SET_GROUPED_NOTIFICATIONS", notifications);
    },
    extractNotificationsId(_, date) {
        return state.grouped[date]
            .filter(notification => notification.created_at.startsWith(date))
            .map(notification => notification.id);
    },
    deleteAllNotifications() {
        const ids = state.notifications.data.map(notification => notification.id);
        axios.post("/notifications/bulk/delete", { ids });
    },
    async deleteGroupNotifications({ dispatch }, date) {
        const ids = await dispatch("extractNotificationsId", date);
        axios.post("/notifications/bulk/delete", { ids });
    },
    async deleteSingleNotification({ dispatch }, notification) {
        await axios.delete(`/notifications/${notification.id}`);
        dispatch("getNotifications");
    }
};

const getters = {};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};

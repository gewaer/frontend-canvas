import moment from "moment";
import groupBy from "lodash/groupBy";
import sortBy from "lodash/sortBy";

const state = {
    data: {}
};

const mutations = {
    SET_NOTIFICATIONS(state, payload) {
        state.data = payload;
    }
};

const actions = {
    readAllNotification() {
        axios({
            url: "/notifications-read-all",
            method: "PUT"
        }).then(() => {
            console.log("Load notifications")
        })
    },
    setGlobalData({ commit }, data) {
        commit("SET_RESOURCES", data.resources);
    },
    getNotifications({ dispatch }) {
        axios({
            url: "/notifications",
            params: {
                q: "(is_deleted:0)",
                sort: "created_at|DESC"
            }
        }).then(({ data: notifications }) => {
            dispatch("groupNotifications", notifications);
        }).catch(error => {
            console.error(error);
        })
    },
    groupNotifications({ dispatch }, notifications) {
        const groupedNotifications = groupBy(notifications, notification => {
            return moment(notification.created_at).format("YYYY-MM-DD");
        })

        dispatch("sortNotifications", groupedNotifications);
    },
    sortNotifications({ commit }, notifications) {
        Object.keys(notifications).forEach(dateKey => {
            notifications[dateKey] = sortBy(notifications[dateKey], ["created_at"], ["desc"]);
        });

        commit("SET_NOTIFICATIONS", notifications);
    },
    extractNotificationsId(_, date) {
        return state.data[date]
            .filter(notification => notification.created_at.startsWith(date))
            .map(notification => notification.id);

    },
    async deleteGroupNotifications({ dispatch }, date) {
        const ids = await dispatch("extractNotificationsId", date);
        axios.delete(`/notifications?id=${ids.join(",")}`)
    },
    deleteSingleNotification(_, notification) {
        axios.delete(`/notifications?id=${notification.id}`);
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

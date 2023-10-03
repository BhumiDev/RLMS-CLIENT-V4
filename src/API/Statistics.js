const token = localStorage.getItem('token');

export const getAdminDashStats = async (courseId) => {
    console.log('course Id', courseId);
    const response = await Axios.get(ApiConfig.statistics.getAdminDashStats, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    console.log('Admin statistics', response);
    const responseData = response;
    return responseData;
};

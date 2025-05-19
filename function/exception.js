function exception(e, error, i18n) {
    if(e.response){
        switch (e.response.status) {
            case 404:
                error({
                    statusCode: 404,
                    message: i18n.t('pages.page_not_found')
                })
                break;
            case 422:
                return error.response.data.errors
            case 500:
                error({
                    statusCode: e.response.status,
                    message: i18n.t('pages.server_error')
                })
                break;
        }
    }
}

export default exception

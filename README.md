# mute-all-instagram-script


A change need to be done in node_modules\instagram-private-api\dist\services\simulate.service.js if you get this error:

IgNotFoundError: GET /api/v1/fbsearch/suggested_searches/?type=users - 404 Not Found;
    at Request.handleResponseError (C:\Users\anton\Desktop\instagram-script-mute-all\node_modules\instagram-private-api\dist\core\request.js:103:20)
    at Request.send (C:\Users\anton\Desktop\instagram-script-mute-all\node_modules\instagram-private-api\dist\core\request.js:54:28)
    at async FbsearchRepository.suggestedSearches (C:\Users\anton\Desktop\instagram-script-mute-all\node_modules\instagram-private-api\dist\repositories\fbsearch.repository.js:7:26)

you need to comment this lines:

    get postLoginFlowRequests() {
        return [
            () => this.client.zr.tokenResult(),
            () => this.client.launcher.postLoginSync(),
            () => this.client.qe.syncExperiments(),
            () => this.client.attribution.logAttribution(),
            () => this.client.attribution.logResurrectAttribution(),
            () => this.client.loom.fetchConfig(),
            () => this.client.linkedAccount.getLinkageStatus(),
            () => this.client.feed.timeline().request({ recoveredFromCrash: '1', reason: 'cold_start_fetch' }),
            //() => this.client.fbsearch.suggestedSearches('users'), <------------------------
            //() => this.client.fbsearch.suggestedSearches('blended'), <------------------------
export class LoadDataUtils {
  controller = null;
  static Pagination = class {
    constructor(
      params,
      listKey = "resultList",
      onLoad = null,
      onError = null,
      onSuccess = null,
      toLoad,
      auto = false,
      infinite = false,
      method = "GET"
    ) {
      this.onLoad = onLoad;
      this.onError = onError;
      this.onSuccess = onSuccess;

      this.toLoad = toLoad;
      this.auto = auto;
      this.listKey = listKey;
      this.method = method;
      this.controller = new AbortController();

      this.params = {
        ...{
          page: 0,
          rpp: 10,
          fields: null,
        },
        ...params,
      };

      this.loading = false;
      this.dataLoaded = false;
      this.infinite = infinite;

      this.paginationInfo = {
        more: false,
        count: 0,
        endPosition: 0,
        maxPages: 0,
        page: 0,
        rpp: 10,
        fields: null,
      };

      this.list = [];
      this.error = [];

      if (this.auto) {
        this.search();
      }
    }

    async abortRequest() {
      if (this.loading) {
        await this.controller.abort(); // Todo quando usar axios
      }
    }

    page() {
      return this.paginationInfo.page;
    }

    count() {
      return this.paginationInfo.count;
    }

    maxPages() {
      return this.paginationInfo.maxPages;
    }

    hasPage() {
      return this.maxPages > 0;
    }

    hasNext() {
      return this.maxPages > this.page && this.hasPage;
    }

    hasPrev() {
      return this.maxPages < this.page && this.hasPage;
    }

    hasMore() {
      return this.params.more;
    }

    hasPagination() {
      return this.hasNext || this.hasPrev;
    }

    isEmpty() {
      return this.list && this.list.length === 0;
    }

    async loadMore() {
      try {
        if (!this.hasMore) {
          return;
        }
        this.params.page += 1;
        return this.search();
      } catch (e) {
        console.log(e);
      }
    }

    async loadNext() {
      try {
        if (!this.hasMore) {
          return;
        }
        this.params.page += 1;
        await this.search();
      } catch (e) {
        console.log(e);
      }
    }

    async loadPrev() {
      try {
        if (this.params.page < 2) {
          return;
        }
        this.params.page -= 1;
        await this.search();
      } catch (e) {
        console.log(e);
      }
    }

    async search(manualParams = null) {
      try {
        this.loading = true;

        let options = {};
        if (manualParams) {
          options = { ...manualParams };
        }

        let reqResult = {};
        switch (typeof this.toLoad) {
          case "function":
            if (Object.prototype.hasOwnProperty.call(options, "options")) {
              options = { ...options["options"], ...options };
            }
            reqResult = await this.toLoad({
              signal: this.controller.signal,
              ...options,
            });
            break;

          case "object":
            if (Object.prototype.hasOwnProperty.call(this.toLoad, "options")) {
              options = { ...this.toLoad["options"], ...options };
            }

            if (Object.prototype.hasOwnProperty.call(this.toLoad, "load")) {
              reqResult = await this.toLoad["load"]({
                signal: this.controller.signal,
                ...options,
              });
            }

            break;
          default:
            break;
        }

        if (this.infinite && !manualParams?.erase) {
          this.list = [...this.list, ...reqResult[this.listKey]];
        } else {
          this.list = reqResult[this.listKey];
        }
        delete reqResult[this.listKey];

        this.params = { ...this.params, ...reqResult };
        this.paginationInfo = { ...this.paginationInfo, ...this.params };

        this.dataLoaded = true;
      } catch (e) {
        console.log(e);
        this.error.push(e);
        this.onError?.(this.error);
      } finally {
        this.loading = false;
        this.onLoad?.({ result: this.list });
      }
      return this.list;
    }
  };
  static FetchAll = class {
    constructor(
      onLoad = null,
      onError = null,
      onSuccess = null,
      loadList = {},
      auto = false
    ) {
      this.loadList = loadList;

      this.onError = onError;
      this.onLoad = onLoad;
      this.onSuccess = onSuccess;

      this.loading = false;
      this.dataLoaded = false;
      this.auto = auto;

      this.result = {};
      this.error = [];

      if (this.auto) {
        this.autoLoad();
      }
    }

    async autoLoad() {
      return await this.loadAll();
    }

    get hasError() {
      return !!this.error?.length;
    }

    async loadAll(manualParams = null) {
      try {
        this.error = [];
        this.loading = true;
        for (const [key, value] of Object.entries(this.loadList)) {
          let options = {};
          if (manualParams !== null) {
            if (Object.prototype.hasOwnProperty.call(manualParams, key)) {
              options = { ...options, ...manualParams[key]?.options };
            }
          }
          try {
            switch (typeof value) {
              case "function":
                this.result[key] = await value({ ...options });
                break;
              case "object":
                if (Object.prototype.hasOwnProperty.call(value, "options")) {
                  options = { ...value["options"], ...options };
                }
                if (Object.prototype.hasOwnProperty.call(value, "load")) {
                  this.result[key] = await value["load"]({ ...options });
                }
                break;
              default:
                break;
            }
          } catch (e) {
            console.log(e);
          }
        }
        if (this.hasError) {
          this.onError?.(this.error);
          return null;
        }
        this.dataLoaded = true;
        this.onSuccess?.(this.result);
      } catch (e) {
        console.log(e);
        this.error.push(e);
      } finally {
        this.loading = false;
      }
      this.onLoad?.({ result: this.result });
      return this.result;
    }
  };

  static Fetch = class {
    constructor(
      onLoad = null,
      onError = null,
      onSuccess = null,
      toLoad,
      auto = false
    ) {
      this.onLoad = onLoad;
      this.onError = onError;
      this.onSuccess = onSuccess;

      this.toLoad = toLoad;
      this.auto = auto;

      this.loading = false;
      this.dataLoaded = false;

      this.result = {};
      this.error = [];

      if (this.auto) {
        this.autoLoad();
      }
    }

    async autoLoad() {
      return await this.load();
    }

    get hasError() {
      return !!this.error?.length;
    }

    async load(manualParams = null) {
      try {
        this.loading = true;

        let options = {};
        if (manualParams !== null) {
          options = { ...options, ...manualParams };
        }
        switch (typeof this.toLoad) {
          case "function":
            this.result = await this.toLoad({ ...options });
            break;
          case "object":
            if (Object.prototype.hasOwnProperty.call(this.toLoad, "options")) {
              options = { ...this.toLoad["options"], ...options };
            }
            if (Object.prototype.hasOwnProperty.call(this.toLoad, "load")) {
              this.result = await this.toLoad["load"]({ ...options });
            }
            break;
          default:
            break;
        }

        this.dataLoaded = true;
      } catch (e) {
        console.log(e);
        this.error.push(e);
        this.onError?.(this.error);
      } finally {
        this.loading = false;
        this.onLoad?.({ result: this.result });
      }
      return this.result;
    }
  };

  /*
    required---------------------

    callBacks--------------------
      ** onLoad:
      ** onError:
      ** onSuccess:
    option-----------------------
      ** auto:
    functions--------------------
      ** hasError:
   */
  //static pagination({} = {}) {
  //    return null;
  //  }

  /*
    required---------------------
      ** loadList: [ Object { "data_to_load": function or function, "options", object } ]
        Send:
        loadList: {
          metadata: MetadataService.getMetadata,
          profile: ProfileService.getProfile,
          users: UserService.getAllUsers,
        }

        Result: {
          metadata: { your_data },
          profile: { your_data },
          users: [ your_data ],
        }
    callBacks--------------------
      ** onLoad:
      ** onError:
      ** onSuccess:
    option-----------------------
      ** auto:
    functions--------------------
      ** loadAll:
      ** hasError:
   */
  static loadList({ onLoad, onError, onSuccess, loadList, auto } = {}) {
    return new this.FetchAll(onLoad, onError, onSuccess, loadList, auto);
  }

  /*
    required---------------------
      ** toLoad: function or [ Object { "load": function, "options", object } ]
        Send:
        toLoad: MetadataService.getMetadata

        Result: {
          your_data
        }
    callBacks--------------------
      ** onLoad:
      ** onError:
      ** onSuccess:
    option-----------------------
      ** auto:
    functions--------------------
      ** load:
      ** hasError:
   */
  static load({ onLoad, onError, onSuccess, toLoad, auto } = {}) {
    return new this.Fetch(onLoad, onError, onSuccess, toLoad, auto);
  }

  static pagination({
                      params,
                      listKey,
                      onLoad,
                      onError,
                      onSuccess,
                      toLoad,
                      auto,
                      infinite,
                      method,
                    } = {}) {
    return new this.Pagination(
      params,
      listKey,
      onLoad,
      onError,
      onSuccess,
      toLoad,
      auto,
      infinite,
      method
    );
  }
}

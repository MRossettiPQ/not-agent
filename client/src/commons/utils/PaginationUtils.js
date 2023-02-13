import { Axios } from "../utils/AxiosUtils";
import _ from "lodash";
import Vue from "vue";

// TODO criar paginação propria
const { $q } = Vue.prototype;
// Class
class FetchData {
  constructor(
    url,
    params,
    infinite,
    listContentAttr = "content",
    onNewPage,
    method,
    axiosApi,
    createPagination,
    showLoading
  ) {
    // Startup parameters
    this.createPagination = createPagination;
    this.showLoading = showLoading;
    this.axiosApi = axiosApi;
    this.url = url;
    this.paginationParams = {
      ...{ page: 1, rpp: 10, fields: null },
      ...params,
    }; // Default
    this.params = createPagination ? this.paginationParams : params; // Default

    this.infinite = infinite;
    this.list = [];
    this.data = null;

    this.listContentAttr = listContentAttr;
    this.next = false;
    this.prev = false;
    this.more = false;
    this.loading = false;
    this.dataLoaded = false;

    // Callback function
    this.onNewPage = onNewPage;

    // Post or Get
    this.method = method;
    this.lastBody = {}; // to Post method

    // Extra data
    this.count = null;
    this.totalPages = null;
    this.currentPage = null;
  }

  hasNext() {
    return this.next;
  }

  hasPrev() {
    return this.prev;
  }

  hasMore() {
    return this.next;
  }

  hasPagination() {
    return this.prev || this.next;
  }

  isEmpty() {
    return this.list && this.list.length === 0;
  }

  async loadMore() {
    try {
      if (!this.createPagination) {
        return;
      }
      if (!this.more) {
        return;
      }
      this.params.page += 1;
      return this.search(false);
    } catch (e) {
      console.log(e);
    }
  }

  async loadNext() {
    try {
      if (!this.createPagination) {
        return;
      }
      if (!this.more) {
        return;
      }
      this.params.page += 1;
      await this.search(false, this.lastBody);
    } catch (e) {
      console.log(e);
    }
  }

  async loadPrev() {
    try {
      if (!this.createPagination) {
        return;
      }
      if (this.params.page < 2) {
        return;
      }
      this.params.page -= 1;
      await this.search(false, this.lastBody);
    } catch (e) {
      console.log(e);
    }
  }

  async search(params = {}, body = {}) {
    try {
      if (this.showLoading) {
        $q.loading.show();
      }
      this.loading = true;

      if (this.createPagination && params) {
        this.params = Object.assign({}, this.paginationParams, params);
        this.list = [];
      }

      let data;
      switch (this.method) {
        case "get":
          ({ data } = await this.axiosApi.get(this.url, {
            params: this.params,
          }));
          break;

        case "post":
          if (!body) {
            body = this.lastBody;
          }
          this.lastBody = body;
          ({ data } = await this.axiosApi.post(this.url, body, {
            params: this.params,
          }));
          break;

        default:
          console.error("Incorrect pagination method");
          break;
      }

      let content = _.get(data, this.listContentAttr);

      if (this.createPagination) {
        if(this.infinite) {
          this.list = [...this.list, ...content.resultList]
        } else {
          this.list = content.resultList
        }
        this.params.page = content.page;
        this.params.rpp = content.rpp;

        this.prev = content.page > 1;
        this.next = this.more = content.more;
      } else {
        this.data = content;
      }

      if (this.onNewPage) {
        this.onNewPage(data.content);
      }
      this.dataLoaded = true;
    } catch (e) {
      this.error = true;
    } finally {
      this.loading = false;
      if (this.showLoading) {
        $q.loading.hide();
      }
    }
  }
}

// Export
export class PaginationUtils {
  static create({
    url,
    params = {},
    infinite = false,
    listContentAttr = "content",
    onNewPage,
    method = "get",
    axiosApi = Axios,
    createPagination = true,
    showLoading = false,
  }) {
    return new FetchData(
      url,
      params,
      infinite,
      listContentAttr,
      onNewPage,
      method,
      axiosApi,
      createPagination,
      showLoading
    );
  }
}

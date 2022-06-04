import makeServerRequest from '../utils/makeServerRequest';

class ShopService {
  async fetchProducts({ ctg, size, limit = 10, skip = 0 } = {}) {
    const params = new URLSearchParams();

    if (ctg?.length > 0) params.append('ctg', ctg);
    if (size?.length > 0) params.append('size', size);

    params.append('limit', limit);
    params.append('skip', skip);

    const res = await makeServerRequest(
      '/public/products?'.concat(params.toString())
    );

    return res;
  }

  async getFilterOptions() {}
}

export default new ShopService();

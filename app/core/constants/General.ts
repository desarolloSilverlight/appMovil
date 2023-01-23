export class General {
  static createFilter(sin: string) {
    const filterFunction = (data: any, filter: string): boolean => {
      const searchTerms = JSON.parse(filter);
      const nameSearch = () => {
        let found = false;
        if (String(data[sin]) != null && String(data[sin]) !== undefined && searchTerms[sin]
          !== undefined && String(data[sin]).toLowerCase().includes(String(searchTerms[sin]).toLowerCase())) {
          found = true;
        }
        return found;
      };
      return nameSearch();
    };
    return filterFunction;
  }
}

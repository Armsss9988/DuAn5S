interface CustomFlatListProps<T> {
    data: T[];
    renderItem: ({ item }: { item: T }) => JSX.Element;
    keyExtractor: (item: T) => string;
  }
import React from "react";
import { connect } from "react-redux";
import { selectShopCollection } from "../../redux/shop/shop.selector";
import CollectionItem from "../../components/collection-item/collection-item.component";

import "./collection.styles.scss";

const CollectionPage = ({ collection }) => {
  const { items, title } = collection;
  return (
    <div className="collection-page">
      <div className="title">{title}</div>
      <div className="items">
        {items.map((item) => (
          <CollectionItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  collection: selectShopCollection(ownProps.match.params.collectionId)(state),
});
export default connect(mapStateToProps)(CollectionPage);

var BaseListView = Backbone.View.extend({

    renderCollection: function() {
        this.collection.each(function(model)
        {
            this.$el.append(new this.item_view({
                model: model
            }).render().el);
        }, this);
        return this;
    },
    
    addItem: function(model, collection, options)
    {
        this.$el.append(new this.item_view({
            model: model
        }).render().el);
    }

});
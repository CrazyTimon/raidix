var Main ={};

Main.Model = Backbone.Model.extend({
    initialize: function(){
        this.test = "asdasd";
    }
});

Main.Collections = Backbone.Collection.extend({
    url:'js/data.json',
    initialize: function(){
        console.log(this);
    }
});

Main.TableView = Backbone.View.extend({
    tagName: "table",
    events:{
        "click .js-delete-row": "onClickDelete"
    },
    onClickDelete: function(e){
        var id = $(e.currentTarget).data("id"),
            removedModel = this.collection.get(id);
        this.collection.remove(removedModel);
        this.render();
    },
    render: function() {
        this.$el.html("");
        this.collection.each(this.addOne, this);
        return this;
    },
    addOne: function(task) {
        var task = new Main.RowView({ model: task });
        this.$el.append( task.render().el );
    }
});

Main.RowView = Backbone.View.extend({
    tagName: 'tr',
    renderRow: function(){
        var row = _.invoke(this.model.toJSON(),function(){
                return "<td>"+this+"</td>"
            }),
            delet_el = $("<td></td>",{
                "class":"js-delete-row",
                "text":"x",
                "data-id":this.model.id
            });
        return delet_el[0].outerHTML + row.join("");
    },
    render: function() {
        this.$el.html(this.renderRow());
        return this;    
    }
});


var colections = new Main.Collections();
colections.fetch({
    success: function(){
        var TableView = new Main.TableView({ collection: colections });        
        $("body").html(TableView.render().el)
    }
});

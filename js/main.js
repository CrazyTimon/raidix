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
    addOne: function(row_model) {
        var table_row = new Main.RowView({ model: row_model, is_header: row_model.get("headers_type") });
        if(table_row.model.get("headers_type")){
            this.$el.prepend( table_row.render().el );        
        } else {
            this.$el.append( table_row.render().el );            
        }
    }
});

Main.RowView = Backbone.View.extend({
    tagName: 'tr',
    renderRow: function(){
        var row = [],
            delet_el = $("<td></td>",{
                "class":"js-delete-row ui-costom-cursor-pointer",
                "data-id":this.model.id
            });
            row = _.invoke(this.model.toJSON(),function(){
                return "<td>"+this+"</td>"
            });
            delet_el.html("x");
        return delet_el.get(0).outerHTML + row.join("");
    },
    renderHeader: function(){
        var row = [],
            delet_el = $("<th></th>");
            row = _.invoke(this.model.toJSON().values,function(){
                return "<th>"+this+"</th>"
            });
            delet_el.html("Удалить строку")
        return delet_el.get(0).outerHTML + row.join("");
    },
    render: function() {
        if(this.options.is_header){
            this.$el.html(this.renderHeader());
        } else {
            this.$el.html(this.renderRow());            
        }
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

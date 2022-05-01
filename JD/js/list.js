class List {
  constructor() {
    // 给属性赋值，调用其他方法
    this.getData();
    // 將加入購物車使用事件委託
    this.$('.sk_bd ul').addEventListener('click',this.addCartFn.bind(this))
  }
  // 获取数据的方法
  async getData() {
    // 等待promise 对象解包完成
    let { data, status } = await axios.get('http://localhost:8888/goods/list?current=1')
    // console.log(data,status);
    //判断返回值状态，追加数据
    if (status == 200) {
      // console.log(data);
      let html = '';

      data.list.forEach(goods => {
        // console.log(goods);
        html += `
  <li class="sk_goods" data-id="${goods.goods_id}">
<a href="detail.html"><img src="${goods.img_big_logo}" alt=""></a>
<h5 class="sk_goods_title">${goods.title}</h5>
<p class="sk_goods_price"><em>${goods.current_price}</em> <del>${goods.price}</del></p>
<div class="sk_goods_progress">
    已售<i>${goods.sale_type}</i>
    <div class="bar">
        <div class="bar_in"></div>
    </div>
    剩余<em>${goods.goods_number}</em>件
</div>
<a href="#none" class="sk_goods_buy">立即抢购</a>
</li> `
      })
      this.$('.sk_bd ul').innerHTML = html;
    }
    }

    // 加入購物車方法
    addCartFn(eve){
      // console.log(this);
      // console.log(eve.target);
      //判斷用戶是否登錄,如果能獲取到token則表示登錄.獲取不到表示未登錄
     let token = localStorage.getItem('token');
    //  跳转页面
     if(!token) location.assign('/login.html?returUrl=./list.html')
    }

    // 获取节点方法
    $(tag){
      let res=document.querySelector(tag)
      return res.length == 1? res[0] : res;
      }
}
new List


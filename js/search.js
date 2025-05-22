document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('searchInput');
  const cancelBtn = document.getElementById('cancelBtn');
  const historyTagsContainer = document.getElementById('historyTags');
  const hotTagsContainer = document.getElementById('hotTags');
  // 移除 historyTrashIcon 变量
  // const historyTrashIcon = document.getElementById('historyTrashIcon');
  const editHistoryBtn = document.getElementById('editHistoryBtn');
  const doneEditingBtn = document.getElementById('doneEditingBtn');
  const historySection = document.querySelector('.history-section');
  const historySectionHeader = historySection.querySelector('.section-header'); // 获取历史搜索头部元素

  // 从 localStorage 加载历史搜索记录
  let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

  // 渲染历史搜索标签
  function renderHistory() {
    historyTagsContainer.innerHTML = ''; // 清空现有标签
    if (searchHistory.length === 0) {
      historyTagsContainer.innerHTML = '<p>暂无历史搜索记录</p>';
      // 没有历史记录时隐藏头部
      historySectionHeader.style.display = 'none';
    } else {
      // 有历史记录时显示头部
      historySectionHeader.style.display = 'flex'; // 假设头部是 flex 布局

      searchHistory.forEach((item, index) => {
        const tagSpan = document.createElement('span');
        tagSpan.classList.add('tag');
        tagSpan.textContent = item;

        // 添加删除图标
        const deleteIcon = document.createElement('i');
        deleteIcon.classList.add('iconfont', 'icon-delete-icon'); // 使用 iconfont 的关闭图标
        deleteIcon.addEventListener('click', (event) => {
          event.stopPropagation(); // 阻止事件冒泡到标签本身
          deleteHistoryItem(index);
        });
        tagSpan.appendChild(deleteIcon);

        // 点击历史标签进行搜索
        // 移除编辑模式判断，因为删除图标始终可见
        tagSpan.addEventListener('click', () => {
          searchInput.value = item;
          // 这里可以添加执行搜索的逻辑
          console.log('搜索历史:', item);
        });

        historyTagsContainer.appendChild(tagSpan);
      });
    }
  }

  // 添加搜索记录
  function addHistory(term) {
    if (term && !searchHistory.includes(term)) {
      searchHistory.unshift(term); // 添加到数组开头
      // 限制历史记录数量，例如最多10条
      if (searchHistory.length > 10) {
        searchHistory.pop();
      }
      localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
      renderHistory();
    }
  }

  // 删除单个历史记录
  function deleteHistoryItem(index) {
    searchHistory.splice(index, 1); // 删除指定索引的记录
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
    renderHistory(); // 重新渲染
  }

  // 清空所有历史记录
  function clearHistory() {
    searchHistory = [];
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
    renderHistory(); // 重新渲染
  }

  // 移除进入/退出编辑状态的函数
  // function enterEditingMode() {
  //   historySection.classList.add('editing');
  //   historyTrashIcon.style.display = 'none';
  //   editHistoryBtn.style.display = 'inline'; // 显示全部删除按钮
  //   doneEditingBtn.style.display = 'inline'; // 显示完成按钮
  // }

  // function exitEditingMode() {
  //   historySection.classList.remove('editing');
  //   historyTrashIcon.style.display = 'block';
  //   editHistoryBtn.style.display = 'none';
  //   doneEditingBtn.style.display = 'none';
  // }

  // 事件监听
  // 搜索框输入事件 (可选：实时搜索建议)
  // searchInput.addEventListener('input', (event) => {
  //     console.log('输入:', event.target.value);
  //     // 这里可以添加实时搜索建议的逻辑
  // });

  // 搜索框回车事件
  searchInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      const searchTerm = searchInput.value.trim();
      if (searchTerm) {
        addHistory(searchTerm);
        // 这里可以添加执行搜索并跳转页面的逻辑
        console.log('执行搜索:', searchTerm);
        // window.location.href = `search_results.html?query=${encodeURIComponent(searchTerm)}`;
      }
    }
  });

  // 取消按钮点击事件 (返回上一页或清空输入框)
  cancelBtn.addEventListener('click', () => {
    // 可以选择返回上一页
    // history.back();
    // 或者只清空输入框
    searchInput.value = '';
  });

  // 移除垃圾桶图标点击事件
  // historyTrashIcon.addEventListener('click', enterEditingMode);

  // 全部删除按钮点击事件
  editHistoryBtn.addEventListener('click', clearHistory);

  // 移除完成按钮点击事件
  // doneEditingBtn.addEventListener('click', exitEditingMode);

  // 移除点击历史搜索区域空白处退出编辑状态的事件
  // historySection.addEventListener('click', (event) => {
  //   // 如果点击的不是标签或删除图标，且当前处于编辑状态，则退出编辑
  //   if (historySection.classList.contains('editing') && !event.target.closest('.tag')) {
  //     exitEditingMode();
  //   }
  // });


  // 点击热门搜索标签
  hotTagsContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('tag')) {
      const searchTerm = event.target.textContent.trim();
      searchInput.value = searchTerm;
      addHistory(searchTerm);
      // 这里可以添加执行搜索的逻辑
      console.log('搜索热门:', searchTerm);
      // window.location.href = `search_results.html?query=${encodeURIComponent(searchTerm)}`;
    }
  });

  // 初始渲染历史记录
  renderHistory();
});
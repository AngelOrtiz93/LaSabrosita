import { Input, Button } from 'ant-design-vue';
import { SearchOutlined } from '@ant-design/icons-vue';

export const getColumnSearchProps = (dataIndex) => ({
  filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => {
    return {
      component: {
        setup() {
          return () => {
            const container = document.createElement('div');
            container.style.padding = '8px';

            const input = document.createElement('a-input');
            input.setAttribute('placeholder', `Buscar ${dataIndex}`);
            input.value = selectedKeys[0];
            input.oninput = (e) => setSelectedKeys(e.target.value ? [e.target.value] : []);
            input.onkeypress = (e) => {
              if (e.key === 'Enter') confirm();
            };
            input.style.width = '188px';
            input.style.marginBottom = '8px';
            input.style.display = 'block';
            container.appendChild(input);

            const searchButton = document.createElement('a-button');
            searchButton.setAttribute('type', 'primary');
            searchButton.onclick = () => confirm();
            searchButton.innerHTML = `Buscar`;
            searchButton.appendChild(document.createElement(SearchOutlined));
            searchButton.style.width = '90px';
            searchButton.style.marginRight = '8px';
            container.appendChild(searchButton);

            const resetButton = document.createElement('a-button');
            resetButton.onclick = () => clearFilters();
            resetButton.innerHTML = `Restablecer`;
            resetButton.style.width = '90px';
            container.appendChild(resetButton);

            return container;
          };
        },
      },
    };
  },
  filterIcon: (filtered) => {
    const icon = document.createElement('SearchOutlined');
    icon.style.color = filtered ? '#1890ff' : undefined;
    return icon;
  },
});

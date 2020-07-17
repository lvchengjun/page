const {
    override,
    fixBabelImports, // 按需加载配置函数
    addLessLoader,  // 自定义主题
    addBabelPlugins // babel插件配置函数
} = require('customize-cra');
const path = require('path');
const rewirePostcss = require('react-app-rewire-postcss');
const px2rem = require('postcss-px2rem');

module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true
    }),
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: { '@primary-color': '#1DA57A'}
    }),
    addBabelPlugins(//支持装饰器(实现链式调用高阶组件<高阶组件：封装的组件返回一个新组件>)
        [
            '@babel/plugin-proposal-decorators',
            {
                legacy: true
            }
        ]
    ),
    (config,env)=>{    
       // 重写postcss
        rewirePostcss(config,{
            plugins: () => [
                require('postcss-flexbugs-fixes'),
                require('postcss-preset-env')({
                    autoprefixer: {
                        flexbox: 'no-2009',
                    },
                    stage: 3,
                }),
               // 设置px2rem
                px2rem({
                    remUnit: 37.5,
                    exclude:/node-modules/
                })
            ],
        });
 
        return config
    }
)
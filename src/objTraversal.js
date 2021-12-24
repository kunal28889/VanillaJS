let obj = {
  id: "0000-1111-2222-3333-4444-5555",
  name: "Distributed Web Application Blueprint",
  type: "blueprint.custom",
  author: "jdoe",
  components: [
    {
      id: "web_server",
      name: "Web Server",
      type: "machine.virtual.vsphere",
      components: [
        {
          id: "http_server",
          name: "Http Web Server",
          type: "machine.virtual.http.webserver",
          data: {
            cpu: 2,
            memory: 1024,
            disk: 200,
            os_type: "linux",
            os_distribution: "rhel"
          }
        },
        {
          id: "apache_server",
          name: "Apache Web Server",
          type: "software.apache.webserver",
          data: {
            cpu: 1,
            memory: 512,
            disk: 100,
            os_type: "linux",
            os_distribution: "rhel"
          }
        }
      ],
      data: {
        cpu: 1,
        memory: 512,
        disk: 100,
        os_type: "Linux",
        os_distribution: "rhel"
      }
    },
    {
      id: "api_server",
      name: "API Server",
      type: "machine.cloud.aws",
      data: {
        cpu: 1,
        memory: 512,
        disk: 100,
        os_type: "linux",
        os_distribution: "rhel"
      }
    },
    {
      id: "db_server",
      name: "Database Server",
      type: "machine.virtual.kvm",
      data: {
        cpu: 1,
        memory: 1024,
        disk: 100,
        os_type: "linux",
        os_distribution: "ubuntu"
      }
    }
  ]
};

/**
 * Find all components with some key = some value
 * get(key, val)
 * eg: get(memory, 1024) should give me all components which have mem=1024
 */

function get(key, val) {
  let res = [];
  function loopOverChildren(children) {
    for (let i = 0; i < children.length; i++) {
      let tempRoot = children[i];
      if (tempRoot["data"] !== undefined && tempRoot["data"][key] === val)
        res.push(tempRoot);
      if (tempRoot.components) loopOverChildren(tempRoot.components);
    }
  }
  loopOverChildren(obj.components);

  console.log(res);
}

get("memory", 512);

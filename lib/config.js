module.exports = {
  defaultTag: 'slack',
  zone: "31002", // 石狩第二
  api: "https://secure.sakura.ad.jp/cloud/zone/is1b/api/cloud/1.1/", // 石狩第二
  plan: "1001", // 1コア、1GBメモリ
  packetfilterid: '112900922505', // See https://secure.sakura.ad.jp/cloud/iaas/#!/network/packetfilter/.
  disk: {
    Plan: { ID: 4 }, // SSD
    SizeMB: 20480, // 20GB
    SourceArchive: { ID: "112900757970" } // Ubuntu 16.04
  },
  notes: [{ID: "112900928939"}] // See https://secure.sakura.ad.jp/cloud/iaas/#!/pref/script/.
}

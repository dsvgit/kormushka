from django.conf.urls import patterns, url

urlpatterns = patterns('webapp.views',
	url(r'^$','index'),
	url(r'^addpurchase/$','addpurchase'),
	url(r'^get-users-by-name/$','getUsersByName'),
	url(r'^get-depart-by-name/$','getDepartByName'),
	url(r'^get-purchase-users/$','getPurchaseUsers'),
	url(r'^ldap-sync/$','ldapSync'),
	url(r'^calculation-purchase/$','calculationPurchase')
)

urlpatterns += patterns('webapp.api.depart_controller',
    url(r'^departs/$', 'departs')
)

urlpatterns += patterns('webapp.api.user_controller',
    url(r'^get-users/$', 'getUsers')
)

urlpatterns += patterns('webapp.api.statistics_controller',
    url(r'^statistics/$', 'statistics'),
	url(r'^get-date-for-period/$', 'getDateForPeriod'),
	url(r'^get-data-for-stat/$', 'getDataForStat')
)
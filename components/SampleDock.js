import {
    Activity,
    Component,
    HomeIcon,
    Mail,
    Package,
    ScrollText,
    SunMoon,
  } from 'lucide-react';

    import { Dock, DockIcon, DockItem, DockLabel } from '@/components/ui/dock';
  
  const data = [
    {
      title: 'Home',
      icon: (
        <HomeIcon className='h-full w-full text-neutral-600 dark:text-neutral-300' />
      ),
      href: '#',
    },
    {
      title: 'Products',
      icon: (
        <Package className='h-full w-full text-neutral-600 dark:text-neutral-300' />
      ),
      href: '#',
    },
    {
      title: 'Components',
      icon: (
        <Component className='h-full w-full text-neutral-600 dark:text-neutral-300' />
      ),
      href: '#',
    },
    {
      title: 'Activity',
      icon: (
        <Activity className='h-full w-full text-neutral-600 dark:text-neutral-300' />
      ),
      href: '#',
    },
    {
      title: 'Change Log',
      icon: (
        <ScrollText className='h-full w-full text-neutral-600 dark:text-neutral-300' />
      ),
      href: '#',
    },
    {
      title: 'Email',
      icon: (
        <Mail className='h-full w-full text-neutral-600 dark:text-neutral-300' />
      ),
      href: '#',
    },
    {
      title: 'Theme',
      icon: (
        <SunMoon className='h-full w-full text-neutral-600 dark:text-neutral-300' />
      ),
      href: '#',
    },
  ];

  const apps = [
    { appName: 'finder'},
    { appName: 'clock'},
    { appName: 'terminal'},
    { appName: 'launchpad'},
    { appName: 'calculator'},
    { appName: 'notes'},
    { appName: 'photobooth'},
    { appName: 'photos'},
    { appName: 'safari'},
    { appName: 'settings'},
    { appName: 'vscode'},
    { appName: 'calendar'},
    { appName: 'sudoko'}
  ]
  
  export function SampleDock() {
    return (
      <div className='absolute bottom-2 left-1/2 max-w-full -translate-x-1/2'>
        <Dock className='items-end pb-3'>
          {apps.map((app, idx) => (
            <DockItem
              key={idx}
              className='aspect-square'
            >
              <DockLabel>{app.appName}</DockLabel>
              <DockIcon>
                <img src={`${app.appName}.png`} alt={app.appName} />
              </DockIcon>
            </DockItem>
          ))}
        </Dock>
      </div>
    );
  }
  